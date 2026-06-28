from django.contrib import admin
from .models import Category, Product, ProductImage, ProductVariant, Review, Wishlist, Cart, CartItem
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(ProductVariant)
admin.site.register(Review)