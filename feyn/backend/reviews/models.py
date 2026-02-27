from django.db import models
from django.contrib.auth.models import User
from shops.models import Shop


class Review(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews"
    )
    
    shop = models.ForeignKey(
        Shop,
        on_delete=models.CASCADE,
        related_name="reviews"
    )
    rating = models.IntegerField()
    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "shop")

    def __str__(self):
        return f"{self.user.username} - (self.shop.name)"