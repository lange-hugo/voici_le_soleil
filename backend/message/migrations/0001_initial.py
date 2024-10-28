from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True)),
                ('place', models.CharField(blank=True, max_length=255)),
                ('couple_names', models.CharField(blank=True, max_length=255)),
                ('message_from', models.CharField(blank=True, max_length=255)),
                ('sender_name', models.CharField(blank=True, max_length=255)),
                ('subject', models.CharField(blank=True, max_length=128)),
                ('email', models.EmailField(max_length=254)),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
    ]
