# Generated by Django 2.2.10 on 2020-02-09 15:52

from django.db import migrations, models
import phonenumber_field.modelfields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('provider_id', models.CharField(blank=True, max_length=10)),
                ('name', models.CharField(blank=True, max_length=255)),
                ('specialty', models.CharField(max_length=64)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('address', models.CharField(blank=True, max_length=128)),
                ('gender', models.CharField(choices=[('MALE', 'male'), ('FEMALE', 'female'), ('OTHER', 'other'), ('PREFER NOT TO SAY', 'prefer not to say')], max_length=30)),
                ('bio', models.TextField(max_length=1028)),
            ],
            options={
                'verbose_name': 'provider',
                'verbose_name_plural': 'providers',
            },
        ),
    ]
