from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
# Combined all necessary permissions in one import
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny 

from .models import Product, Order
from .serializers import ProductDetailSerializer, OrderSerializer, RegisterSerializer

class RegisterView(APIView):
    """
    View to register a new user.
    Accessible by anyone.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductListView(generics.ListCreateAPIView):
    """
    View to list all products. 
    Anyone can view (Read-Only), but only logged-in users can create via API.
    """
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class OrderCreateView(generics.ListCreateAPIView):
    """
    View to create and list orders.
    Strictly restricted to authenticated users.
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return only the orders belonging to the logged-in user
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically associate the order with the user from the JWT token
        serializer.save(user=self.request.user)