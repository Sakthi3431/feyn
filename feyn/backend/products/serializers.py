from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    shop = serializers.ReadOnlyField(source = 'shop.name')

    class Meta:
        model = Product
        fields = "__all__"