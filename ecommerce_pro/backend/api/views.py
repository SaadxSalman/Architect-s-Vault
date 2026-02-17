from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductDetailSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]