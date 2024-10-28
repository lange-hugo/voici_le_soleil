from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from user.models import User

from product.models import Product


class ProductModelTestCase(TestCase):
    def test_product_creation(self):
        user = User.objects.create(
            username="John", email="john.doe@gmail.com", password="Ih4ve4p4sswOrd!"
        )
        Product.objects.create(
            user=user,
            title="Plan drone",
            description="Faire une vidéo au drone",
            price=500,
        )


class ProductViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username="John", email="john.doe@gmail.com", password="Ih4ve4p4sswOrd!"
        )
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_product_list(self):
        request = self.client.get("/api/product/")
        self.assertEqual(request.status_code, 200)

    def test_product_create(self):
        request = self.client.post(
            "/api/product/",
            {
                "user": self.user.id,
                "title": "Plan drone",
                "description": "Faire une vidéo au drone",
                "price": 500,
            },
        )
        self.assertEqual(request.status_code, 201)

    def test_product_delete(self):
        product = Product.objects.create(
            user=self.user,
            title="Plan drone",
            description="Faire une vidéo au drone",
            price=500,
        )
        request = self.client.delete(f"/api/product/{product.id}/")
        self.assertEqual(request.status_code, 204)
