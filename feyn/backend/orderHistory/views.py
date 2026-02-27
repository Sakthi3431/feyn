from django.shortcuts import render
from .models import generics, permissions
from .serializer import OrderSerializer
from rest_framework import Order

class OrderListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.object.filter(customer = self.request.user).order_by("-created_at")
    
    def perform_create(self, serializer):
        serializer.save(customer = self.request.user)