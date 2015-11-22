# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0008_auto_20151116_1515'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='contract',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='friends',
            field=models.ManyToManyField(blank=True, to='Users.UserProfile', related_name='_friends_+'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='userInfo',
            field=models.TextField(blank=True, null=True),
        ),
    ]
