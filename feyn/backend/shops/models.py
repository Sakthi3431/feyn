from django.db import models
from django.contrib.auth.models import User

class Shop(models.Model):
    AREA_CHOICES = [
        ("village", "Village"),
        ("town", "Town"),
        ("city", "City"),
        ("prime", "Prime Area")
    ]
    owner = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="shop"
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    address = models.CharField(max_length=255)
    area_type = models.CharField(max_length=20, choices=AREA_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name