from django.db import models


class Message(models.Model):
    """Message from contact."""

    date = models.DateField(auto_now=True)
    place = models.CharField(max_length=255, blank=True)
    couple_names = models.CharField(max_length=255, blank=True)
    message_from = models.CharField(max_length=255, blank=True)
    sender_name = models.CharField(max_length=255, blank=True)
    subject = models.CharField(null=False, blank=True, max_length=128)
    email = models.EmailField(null=False, blank=False)
    message = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
