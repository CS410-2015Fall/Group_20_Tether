# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_userprofile_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='userInfo',
            new_name='userbio',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='token',
            field=models.CharField(max_length=100, blank=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='username',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
