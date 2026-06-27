import React from 'react'
import CartItem from '../components/cart/CartItem'
import PromoCode from '../components/cart/PromoCode'
import OffersStrip from '../components/cart/OffersStrip'
import CartSummary from '../components/cart/CartSummary'
import { useCart } from '../context/CartContext'

function Cart() {
  return (
    <div>
    <CartItem/>
    <PromoCode/>
    <OffersStrip/>
    <CartSummary/>
    </div>

  )
}

export default Cart