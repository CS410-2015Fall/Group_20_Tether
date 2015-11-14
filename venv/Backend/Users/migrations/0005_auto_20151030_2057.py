# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0004_auto_20151030_2045'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='userbio',
            new_name='userInfo',
        ),
    ]
