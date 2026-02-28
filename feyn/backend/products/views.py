from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework import filters
from django.utils import timezone
from .models import Product
from .serializers import ProductSerializer
from shops.models import Shop

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class =  ProductSerializer
    search_fields = ["name", "description"]
    def get_queryset(self):
        queryset = Product.objects.all().order_by("-created_at")
        shop_id = self.request.query_params.get("shop")
        area = self.request.query_params.get("area")
        if area:
            queryset = queryset.filter(area_type = area)
        if shop_id:
            queryset = queryset.filter(shop_id = shop_id)

        return queryset
    def get_permission(self):
        if self.request.method == "POST":
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def perform_create(self, serializer):
        try:
            shop = Shop.objects.get(owner=self.request.user)
        except Shop.DoesNotExist:
            raise PermissionDenied("You must create a shop first.")
        #check subscription
        try:
            subscription = shop.subscription
        except:
            raise PermissionDenied("You must subscribe to a plan")
        if not subscription.active or subscription.end_date < timezone.now():
            raise PermissionDenied("Subscription expired.")
        
        product_count = shop.products.count()
        if product_count >= subscription.plan.product_limit:
            raise PermissionDenied("Product limit reached for your plan")
        
        serializer.save(shop=shop)

class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
