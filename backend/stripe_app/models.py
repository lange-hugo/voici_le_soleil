from django.db import models
from product.models import Product


class Order(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="orders"
    )
    session = models.CharField(
        blank=False, null=False, max_length=255, help_text="stripe checkout session id"
    )
