from django.contrib.auth.password_validation import validate_password
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import GenericViewSet

from user.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "is_active",
            "email",
            "password",
        ]
        read_only_fields = [
            "id",
        ]
        extra_kwargs = {
            "password": {
                "write_only": True,
            },
        }

    def validate(self, data: dict) -> dict:
        password = data.get("password")
        email = data.get("email")
        if password is None or email is None:
            error_msg = "Password and email are mandatory for user creation"
            raise ValidationError(error_msg)

        validate_password(data.get("password"))
        return data

    def create(self, validate_data: dict) -> User:
        user = User.objects.create_user(**validate_data)
        user.clean()
        return user


class UserView(GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_permissions(self) -> list:
        if self.action == "create":
            return []
        else:
            return super().get_permissions()

    def list(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
