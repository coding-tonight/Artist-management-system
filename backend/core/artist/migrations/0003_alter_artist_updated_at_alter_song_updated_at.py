# Generated by Django 5.1.1 on 2024-09-14 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artist', '0002_alter_artist_no_of_albums_released'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artist',
            name='updated_at',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='song',
            name='updated_at',
            field=models.DateTimeField(null=True),
        ),
    ]
