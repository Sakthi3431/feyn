from rest_framework.exceptions import ValidationError
from rest_framework import generics, permissions
from .models import Shop
from .serializer import ShopSerializer

class ShopListCreateAPIView(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if Shop.objects.filter(owner = self.request.user).exists():
            raise ValidationError("You already have a shop")
        serializer.save(owner=self.request.user)

class ShopDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [permissions.IsAuthenticated]
    