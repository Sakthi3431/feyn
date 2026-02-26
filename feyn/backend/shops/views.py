from django.shortcuts import render
from .models import Shop
from .serializer import ShopSerializer
from rest_framework import generics

class ShopListCreateAPIView(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

class ShopDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    
