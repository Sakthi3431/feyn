from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError
from .models import Review
from .serializer import ReviewSerializer


class ReviewListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        shop_id = self.request.query_params.get("shop")
        queryset = Review.objects.all().order_by("-created_at")

        if shop_id:
            queryset = queryset.filter(shop_id = shop_id)

        return queryset
    
    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def perform_create(self, serializer):
        shop_id = self.request.data.get("shop")

        if Review.objects.filter(
            user = self.request.user,
            shop_id = shop_id
        ).exists():
            raise ValidationError("You already revied this shop")
        
        serializer.save(user = self.request.user)