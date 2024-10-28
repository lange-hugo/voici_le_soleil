from datetime import datetime

from django.test import TestCase
from rest_framework.test import APIClient

from message.models import Message


class MessageModelTestCase(TestCase):
    def test_message_creation(self):
        Message.objects.create(
            date=datetime.now(),
            place="My adress",
            couple_names="Machine & Bidule",
            message_from="parent",
            sender_name="john doe",
            subject="Demande de prestation pour un mariage",
            email="john.doe@gmail.com",
            message="nothing to add",
        )


class MessageViewTestcase(TestCase):
    def test_message_create(self):
        client = APIClient()
        request = client.post(
            "/api/message/",
            {
                "date": datetime.now(),
                "place": "My adress",
                "couple_names": "Machine & Bidule",
                "message_from": "parent",
                "sender_name": "john doe",
                "subject": "Demande de prestation pour un mariage",
                "email": "john.doe@gmail.com",
                "message": "nothing to add",
            },
        )
        self.assertEqual(request.status_code, 201)
