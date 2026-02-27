from django.db import models
from shops.models import Shop

class SubscriptionPlan(models.Model):
    PLAN_CHOICES = [
        ("basic", "Basic"),
        ("pro", "Pro"),
        ("elite", "Elite"),
    ]
    name = models.CharField(max_length=20, choices=PLAN_CHOICES, unique=True)    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    product_limit = models.IntegerField()

    def __str__(self):
        return f"{self.name} - ₹{self.price}"
    

class ShopSubscription(models.Model):
    shop = models.OneToOneField(
        Shop,
        on_delete = models.CASCADE,
        related_name="subscription"
    )
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE)

    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField()

    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.shop.name} - {self.plan.name}"