# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0009_auto_20151116_1520'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='userInfo',
            field=models.CharField(null=True, max_length=1000, blank=True),
        ),
    ]
