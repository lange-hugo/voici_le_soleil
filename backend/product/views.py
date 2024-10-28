from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "id",
            "user",
            "title",
            "description",
            "price",
            "created_at",
        ]

    def create(self, validated_data):
        return Product.objects.create(**validated_data)


class ProductView(GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

    def get_permissions(self):
        match self.request.method:
            case "LIST":
                return []
        return super().get_permissions()

    def get_queryset(self):
        not_bought_query_parameter = self.request.query_params.get("is_bought", False)
        return Product.objects.filter(
            user=self.request.user,
            is_bought=not_bought_query_parameter,
        )

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(
            self.get_serializer(instance).data,
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, pk):
        instance = self.get_object()
        if instance.user != request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if instance.is_bought:
            return Response(status=status.HTTP_403_FORBIDDEN)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
