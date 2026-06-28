from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.ProductViewSet, basename='product')

urlpatterns = [
    path('categories/', views.CategoryListView.as_view(), name='categories'),
    path('cart/', views.get_cart, name='cart'),
    path('cart/add/', views.add_to_cart, name='cart-add'),
    path('cart/update/<int:item_id>/', views.update_cart_item, name='cart-update'),
    path('cart/remove/<int:item_id>/', views.remove_cart_item, name='cart-remove'),
    path('cart/clear/', views.clear_cart, name='cart-clear'),
    path('wishlist/', views.get_wishlist, name='wishlist'),
    path('wishlist/toggle/<int:product_id>/', views.toggle_wishlist, name='wishlist-toggle'),
    path('<int:product_id>/reviews/', views.ReviewCreateView.as_view(), name='review-create'),
    path('', include(router.urls)),
]