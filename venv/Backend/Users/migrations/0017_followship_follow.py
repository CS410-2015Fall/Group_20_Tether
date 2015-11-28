# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('friendship', '0001_initial'),
        ('Users', '0016_followship'),
    ]

    operations = [
        migrations.AddField(
            model_name='followship',
            name='follow',
            field=models.OneToOneField(to='friendship.Follow', null=True),
        ),
    ]
