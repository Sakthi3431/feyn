from rest_framework import generics, viewsets, status, filters
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Category, Product, Review, Wishlist, Cart, CartItem
from .serializers import (CategorySerializer, ProductListSerializer, ProductDetailSerializer,
                          ReviewSerializer, WishlistSerializer, CartSerializer, CartItemSerializer)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured', 'seller']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'rating', 'created_at']

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True)
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            qs = qs.filter(price__gte=min_price)
        if max_price:
            qs = qs.filter(price__lte=max_price)
        return qs

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user.seller_profile)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        products = Product.objects.filter(is_active=True, is_featured=True)[:8]
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_products(self, request):
        if not hasattr(request.user, 'seller_profile'):
            return Response({'error': 'Not a seller'}, status=403)
        products = Product.objects.filter(seller=request.user.seller_profile)
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)

class ReviewCreateView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        product = Product.objects.get(id=product_id)
        review = serializer.save(user=self.request.user, product=product)
        reviews = product.reviews.all()
        product.rating = sum(r.rating for r in reviews) / reviews.count()
        product.review_count = reviews.count()
        product.save()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    return Response(CartSerializer(cart).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    cart, _ = Cart.objects.get_or_create(user=request.user)
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))
    product = Product.objects.get(id=product_id)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product,
                                                    defaults={'quantity': quantity})
    if not created:
        item.quantity += quantity
        item.save()
    return Response(CartSerializer(cart).data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    item = CartItem.objects.get(id=item_id, cart__user=request.user)
    quantity = int(request.data.get('quantity', 1))
    if quantity <= 0:
        item.delete()
    else:
        item.quantity = quantity
        item.save()
    cart = Cart.objects.get(user=request.user)
    return Response(CartSerializer(cart).data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_cart_item(request, item_id):
    CartItem.objects.filter(id=item_id, cart__user=request.user).delete()
    cart = Cart.objects.get(user=request.user)
    return Response(CartSerializer(cart).data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    Cart.objects.filter(user=request.user).delete()
    return Response({'message': 'Cart cleared'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wishlist(request):
    items = Wishlist.objects.filter(user=request.user)
    return Response(WishlistSerializer(items, many=True).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_wishlist(request, product_id):
    product = Product.objects.get(id=product_id)
    item, created = Wishlist.objects.get_or_create(user=request.user, product=product)
    if not created:
        item.delete()
        return Response({'wishlisted': False})
    return Response({'wishlisted': True})
