from django.db import models
from user.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")
    title = models.CharField(blank=False, null=False, max_length=255)
    description = models.TextField()
    price = models.FloatField(null=False, default=0)
    is_bought = models.BooleanField(null=False, default=False)
    created_at = models.DateField(auto_now_add=True)
