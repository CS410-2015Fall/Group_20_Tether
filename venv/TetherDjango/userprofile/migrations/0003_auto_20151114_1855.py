# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0002_auto_20151114_1820'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='gcm_token',
            field=models.CharField(max_length=200),
        ),
    ]
