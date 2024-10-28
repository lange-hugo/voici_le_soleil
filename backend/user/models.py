from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["password"]
    email = models.EmailField(
        blank=False, null=False, unique=True, verbose_name="email address"
    )
