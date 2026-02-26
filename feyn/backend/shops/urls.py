from django.urls import path
from .views import (ShopDetailAPIView, ShopListCreateAPIView)
urlpatterns = [
 path('', ShopListCreateAPIView.as_view()),
 path('<int:pk>/', ShopDetailAPIView.as_view()),

]