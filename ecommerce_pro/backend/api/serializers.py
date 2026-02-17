from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Review, Order

# --- User Authentication ---

class RegisterSerializer(serializers.ModelSerializer):
    # Fixed typo: changed write_ok to write_only
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

# --- Product & Reviews ---

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'content', 'rating']

class ProductDetailSerializer(serializers.ModelSerializer):
    # Nested logic to show all reviews for a specific product
    reviews = ReviewSerializer(many=True, read_only=True) 

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image_url', 'reviews']

# --- Orders ---

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'product_names', 'total_price', 'created_at']
        read_only_fields = ['user']