# Generated by Django 5.1.4 on 2024-12-14 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_alter_recipecategory_options_category_slug_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='category_img',
            field=models.FileField(blank=True, upload_to='uploads/', verbose_name='Изображение'),
        ),
    ]