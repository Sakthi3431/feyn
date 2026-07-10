from django.contrib import admin
from .models import Category, Product, ProductImage, ProductVariant, Review, Wishlist, Cart, CartItem, ProductAttribute, ProductHighlight, ProductOffer, ProductSpecification

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(ProductVariant)
admin.site.register(Review)
admin.site.register(ProductSpecification)
admin.site.register(ProductAttribute)
admin.site.register(ProductHighlight)
admin.site.register(ProductOffer)
admin.site.register(Wishlist)
