# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0007_remove_userprofile_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='contracts',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='friends',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='userInfo',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='GCM_token',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
