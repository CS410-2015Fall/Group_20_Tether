# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0012_auto_20151121_1205'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='friend_names',
            new_name='friends',
        ),
    ]
