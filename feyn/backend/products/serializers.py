from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductVariant, Review, Wishlist, Cart, CartItem

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'image', 'parent', 'children')
    def get_children(self, obj):
        return CategorySerializer(obj.children.all(), many=True).data

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ('id', 'user', 'user_name', 'rating', 'title', 'comment', 'created_at')
        read_only_fields = ('user',)
    def get_user_name(self, obj):
        return obj.user.username

class ProductListSerializer(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()
    seller_name = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ('id', 'name', 'slug', 'price', 'compare_price', 'rating', 'review_count',
                  'primary_image', 'seller_name', 'category_name', 'stock', 'is_featured')
    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        return img.image.url if img else None
    def get_seller_name(self, obj):
        return obj.seller.store_name
    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

class ProductDetailSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    seller_name = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = '__all__'
    def get_seller_name(self, obj):
        return obj.seller.store_name
    def get_category_name(self, obj):
        return obj.category.name if obj.category else None

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    total_price = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ('id', 'product', 'product_id', 'variant', 'quantity', 'total_price', 'added_at')
    def get_total_price(self, obj):
        return float(obj.product.price) * obj.quantity

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()
    item_count = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ('id', 'items', 'total', 'item_count', 'updated_at')
    def get_total(self, obj):
        return sum(float(item.product.price) * item.quantity for item in obj.items.all())
    def get_item_count(self, obj):
        return sum(item.quantity for item in obj.items.all())

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    class Meta:
        model = Wishlist
        fields = ('id', 'product', 'added_at')
