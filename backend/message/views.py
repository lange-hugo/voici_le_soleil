from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from message.models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            "id",
            "date",
            "place",
            "couple_names",
            "message_from",
            "sender_name",
            "subject",
            "email",
            "message",
            "created_at",
        ]
        read_only_fields = [
            "id",
        ]


class MessageView(GenericViewSet):
    permission_classes = [AllowAny]
    serializer_class = MessageSerializer
    authentication_classes = []

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
