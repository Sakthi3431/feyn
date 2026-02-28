from django.contrib import admin
from .models import SubscriptionPlan, ShopSubscription

admin.site.register(SubscriptionPlan)
admin.site.register(ShopSubscription)