# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0013_auto_20151121_1356'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='friends',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='friend_with',
            field=models.ForeignKey(to='Users.UserProfile', related_name='friend', null=True),
        ),
    ]
