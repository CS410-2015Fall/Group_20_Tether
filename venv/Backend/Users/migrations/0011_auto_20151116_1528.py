# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0010_auto_20151116_1522'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='contract',
            field=models.CharField(max_length=500, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='userInfo',
            field=models.CharField(max_length=500, null=True, blank=True),
        ),
    ]
