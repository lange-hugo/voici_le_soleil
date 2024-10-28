from django.test import TestCase
from product.models import Product
from user.models import User

from stripe_app.models import Order


class OrderModelTestCase(TestCase):
    def test_order_creation(self):
        user = User.objects.create(
            username="John", email="john.doe@gmail.com", password="Ih4ve4p4sswOrd!"
        )
        product = Product.objects.create(
            user=user,
            title="Plan drone",
            description="Faire une vidéo au drone",
            price=500,
        )
        Order.objects.create(product=product, session="fake_stripe_session_id")
