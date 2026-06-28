from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
import random, string
from .models import Order, OrderItem, Coupon
from .serializers import OrderSerializer, CreateOrderSerializer, CouponSerializer
from products.models import Cart, CartItem
from users.models import Address

def generate_order_number():
    return 'ORD' + ''.join(random.choices(string.digits, k=8))

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_list(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
        return Response(OrderSerializer(order).data)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    serializer = CreateOrderSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=400)

    try:
        address = Address.objects.get(id=serializer.validated_data['shipping_address_id'],
                                       user=request.user)
    except Address.DoesNotExist:
        return Response({'error': 'Address not found'}, status=404)

    cart = Cart.objects.filter(user=request.user).first()
    if not cart or not cart.items.exists():
        return Response({'error': 'Cart is empty'}, status=400)

    subtotal = sum(float(item.product.price) * item.quantity for item in cart.items.all())
    shipping_cost = 0 if subtotal > 500 else 50
    discount = 0

    coupon_code = serializer.validated_data.get('coupon_code', '')
    if coupon_code:
        try:
            coupon = Coupon.objects.get(code=coupon_code, is_active=True)
            if coupon.min_order_value <= subtotal:
                if coupon.discount_type == 'percent':
                    discount = subtotal * float(coupon.discount_value) / 100
                else:
                    discount = float(coupon.discount_value)
                coupon.used_count += 1
                coupon.save()
        except Coupon.DoesNotExist:
            pass

    total = subtotal + shipping_cost - discount

    shipping_addr = {
        'street': address.street, 'city': address.city, 'state': address.state,
        'postal_code': address.postal_code, 'country': address.country
    }

    order = Order.objects.create(
        user=request.user,
        order_number=generate_order_number(),
        payment_method=serializer.validated_data['payment_method'],
        shipping_address=shipping_addr,
        subtotal=subtotal, shipping_cost=shipping_cost,
        discount=discount, total=total,
        notes=serializer.validated_data.get('notes', '')
    )

    for item in cart.items.all():
        primary = item.product.images.filter(is_primary=True).first()
        OrderItem.objects.create(
            order=order, product=item.product,
            product_name=item.product.name,
            product_image=primary.image.url if primary else '',
            price=item.product.price, quantity=item.quantity,
            total=float(item.product.price) * item.quantity
        )
        item.product.stock = max(0, item.product.stock - item.quantity)
        item.product.save()

    cart.items.all().delete()
    return Response(OrderSerializer(order).data, status=201)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
        if order.status not in ['pending', 'confirmed']:
            return Response({'error': 'Cannot cancel this order'}, status=400)
        order.status = 'cancelled'
        order.save()
        return Response(OrderSerializer(order).data)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def seller_orders(request):
    if not hasattr(request.user, 'seller_profile'):
        return Response({'error': 'Not a seller'}, status=403)
    order_items = OrderItem.objects.filter(product__seller=request.user.seller_profile)
    order_ids = order_items.values_list('order_id', flat=True).distinct()
    orders = Order.objects.filter(id__in=order_ids).order_by('-created_at')
    return Response(OrderSerializer(orders, many=True).data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):
    if not hasattr(request.user, 'seller_profile'):
        return Response({'error': 'Not a seller'}, status=403)
    try:
        order = Order.objects.get(id=order_id)
        order.status = request.data.get('status', order.status)
        order.save()
        return Response(OrderSerializer(order).data)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def validate_coupon(request):
    code = request.data.get('code', '')
    try:
        coupon = Coupon.objects.get(code=code, is_active=True)
        return Response(CouponSerializer(coupon).data)
    except Coupon.DoesNotExist:
        return Response({'error': 'Invalid coupon'}, status=404)