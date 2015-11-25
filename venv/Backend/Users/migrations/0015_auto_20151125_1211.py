# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0014_auto_20151121_1725'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='friend_with',
            field=models.ForeignKey(blank=True, related_name='friend', to='Users.UserProfile', null=True),
        ),
    ]
