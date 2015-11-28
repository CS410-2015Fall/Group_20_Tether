from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from friendship.models import Friend, Follow


from __future__ import unicode_literals
from django.db import models
from django.conf import settings
from django.db.models import Q
from django.core.cache import cache
from django.core.exceptions import ValidationError

from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.utils.encoding import python_2_unicode_compatible

from friendship.exceptions import AlreadyExistsError, AlreadyFriendsError
from friendship.signals import (
    friendship_request_created, friendship_request_rejected,
    friendship_request_canceled,
    friendship_request_viewed, friendship_request_accepted,
    friendship_removed, follower_created, follower_removed,
    followee_created, followee_removed, following_created, following_removed
)

AUTH_USER_MODEL = getattr(settings, 'AUTH_USER_MODEL', 'auth.User')



# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    friend_with = models.ForeignKey('self', blank=True, null=True, related_name="friend")
    # friends = models.CharField(max_length=500, blank=True, null=True)
    contract = models.TextField(blank=True, null=True)
    userInfo = models.CharField(max_length=500, blank=True, null=True) 
    contract = models.CharField(max_length=500, null=True, blank=True)
    GCM_token = models.CharField(max_length=100, blank=True)
    # user_tokens = User.objects.values('auth_token')

    # def __unicode__(self):
    #     return username

# class Followship(models.Model):
#     user = models.OneToOneField(User)
#     follow = models.OneToOneField(Follow, null=True)
#     # following = follow.object.get(followee)
#     # following = Follow.objects.following(user)


class FollowingManager(models.Manager):
    """ Following manager """

    def followers(self, user):
        """ Return a list of all followers """
        key = cache_key('followers', user.pk)
        followers = cache.get(key)

        if followers is None:
            qs = Follow.objects.filter(followee=user).all()
            followers = [u.follower for u in qs]
            cache.set(key, followers)

        return followers

    def following(self, user):
        """ Return a list of all users the given user follows """
        key = cache_key('following', user.pk)
        following = cache.get(key)

        if following is None:
            qs = Follow.objects.filter(follower=user).all()
            following = [u.followee for u in qs]
            cache.set(key, following)

        return following

    def add_follower(self, follower, followee):
        """ Create 'follower' follows 'followee' relationship """
        if follower == followee:
            raise ValidationError("Users cannot follow themselves")

        relation, created = Follow.objects.get_or_create(follower=follower, followee=followee)

        if created is False:
            raise AlreadyExistsError("User '%s' already follows '%s'" % (follower, followee))

        follower_created.send(sender=self, follower=follower)
        followee_created.send(sender=self, followee=followee)
        following_created.send(sender=self, following=relation)

        bust_cache('followers', followee.pk)
        bust_cache('following', follower.pk)

        return relation

    def remove_follower(self, follower, followee):
        """ Remove 'follower' follows 'followee' relationship """
        try:
            rel = Follow.objects.get(follower=follower, followee=followee)
            follower_removed.send(sender=rel, follower=rel.follower)
            followee_removed.send(sender=rel, followee=rel.followee)
            following_removed.send(sender=rel, following=rel)
            rel.delete()
            bust_cache('followers', followee.pk)
            bust_cache('following', follower.pk)
            return True
        except Follow.DoesNotExist:
            return False

    def follows(self, follower, followee):
        """ Does follower follow followee? Smartly uses caches if exists """
        followers = cache.get(cache_key('following', follower.pk))
        following = cache.get(cache_key('followers', followee.pk))

        if followers and followee in followers:
            return True
        elif following and follower in following:
            return True
        else:
            try:
                Follow.objects.get(follower=follower, followee=followee)
                return True
            except Follow.DoesNotExist:
                return False


@python_2_unicode_compatible
class Follow(models.Model):
    """ Model to represent Following relationships """
    follower = models.ForeignKey(AUTH_USER_MODEL, related_name='following')
    followee = models.ForeignKey(AUTH_USER_MODEL, related_name='followers')
    created = models.DateTimeField(default=timezone.now)

    objects = FollowingManager()

    class Meta:
        verbose_name = _('Following Relationship')
        verbose_name_plural = _('Following Relationships')
        unique_together = ('follower', 'followee')

    def __str__(self):
        return "User #%d follows #%d" % (self.follower_id, self.followee_id)

    def save(self, *args, **kwargs):
        # Ensure users can't be friends with themselves
        if self.follower == self.followee:
            raise ValidationError("Users cannot follow themselves.")
        super(Follow, self).save(*args, **kwargs)
