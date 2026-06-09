import React from 'react'
import CartItem from '../components/cart/CartItem'
import PromoCode from '../components/cart/PromoCode'
import OffersStrip from '../components/cart/OffersStrip'
import CartSummary from '../components/cart/CartSummary'

function Cart() {
  return (
    <div>
      <div>
    <CartItem/>
    <PromoCode/>
    <OffersStrip/>
      </div>
      <CartSummary/>
    </div>

  )
}

export default Cart