from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from user.models import User


# Create your tests here.
class UserModelTestCase(TestCase):
    def test_user_creation(self):
        User.objects.create(
            username="John", email="john.doe@gmail.com", password="Ih4ve4p4sswOrd!"
        )


class UserViewTestCase(TestCase):
    def test_user_create(self):
        client = APIClient()
        request = client.post(
            "/api/user/",
            {
                "username": "John",
                "email": "john.doe@gmail.com",
                "password": "Ih4ve4p4sswOrd!",
            },
        )
        self.assertEqual(request.status_code, 201)

    def test_user_list(self):
        user = User.objects.create(
            username="John", email="john.doe@gmail.com", password="Ih4ve4p4sswOrd!"
        )
        client = APIClient()
        refresh = RefreshToken.for_user(user)
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
        request = client.get("/api/user/")

        self.assertEqual(request.status_code, 200)
