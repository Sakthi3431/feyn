import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiPlus, FiTag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { authAPI, orderAPI } from '../services/api';
import toast from 'react-hot-toast';
// import './CheckoutPage.css';

export default function CheckoutPage() {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddr, setSelectedAddr] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState({ label: 'Home', street: '', city: '', state: '', postal_code: '', country: 'India' });
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    authAPI.getAddresses().then(r => {
      setAddresses(r.data);
      const def = r.data.find(a => a.is_default) || r.data[0];
      if (def) setSelectedAddr(def.id);
    });
  }, []);

  if (!cart?.items?.length) { navigate('/cart'); return null; }

  const subtotal = cart.total;
  const shipping = subtotal >= 500 ? 0 : 50;
  const discount = coupon ? (coupon.discount_type === 'percent' ? subtotal * coupon.discount_value / 100 : coupon.discount_value) : 0;
  const total = subtotal + shipping - discount;

  const validateCoupon = async () => {
    try {
      const res = await orderAPI.validateCoupon(couponCode);
      setCoupon(res.data);
      toast.success('Coupon applied!');
    } catch { toast.error('Invalid coupon code'); }
  };

  const addAddress = async () => {
    try {
      const res = await authAPI.addAddress(addrForm);
      setAddresses(prev => [...prev, res.data]);
      setSelectedAddr(res.data.id);
      setShowAddrForm(false);
      toast.success('Address added');
    } catch { toast.error('Failed to add address'); }
  };

  const placeOrder = async () => {
    if (!selectedAddr) { toast.error('Please select an address'); return; }
    setPlacing(true);
    try {
      const res = await orderAPI.createOrder({ shipping_address_id: selectedAddr, payment_method: paymentMethod, coupon_code: couponCode });
      await fetchCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${res.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to place order');
    } finally { setPlacing(false); }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-layout">
          <div className="checkout-main">
            {/* Addresses */}
            <div className="checkout-section">
              <h3>Delivery Address</h3>
              <div className="addresses-grid">
                {addresses.map(addr => (
                  <div key={addr.id} className={`address-card ${selectedAddr === addr.id ? 'selected' : ''}`}
                    onClick={() => setSelectedAddr(addr.id)}>
                    <div className="addr-select">{selectedAddr === addr.id && <FiCheck />}</div>
                    <strong>{addr.label}</strong>
                    <p>{addr.street}, {addr.city}</p>
                    <p>{addr.state} - {addr.postal_code}</p>
                    <p>{addr.country}</p>
                  </div>
                ))}
                <div className="address-card add-new" onClick={() => setShowAddrForm(!showAddrForm)}>
                  <FiPlus /> Add New Address
                </div>
              </div>
              {showAddrForm && (
                <div className="addr-form">
                  <div className="form-row-2">
                    <input placeholder="Label (Home/Work)" value={addrForm.label} onChange={e => setAddrForm({...addrForm, label: e.target.value})} />
                    <input placeholder="Street Address" value={addrForm.street} onChange={e => setAddrForm({...addrForm, street: e.target.value})} />
                  </div>
                  <div className="form-row-3">
                    <input placeholder="City" value={addrForm.city} onChange={e => setAddrForm({...addrForm, city: e.target.value})} />
                    <input placeholder="State" value={addrForm.state} onChange={e => setAddrForm({...addrForm, state: e.target.value})} />
                    <input placeholder="Postal Code" value={addrForm.postal_code} onChange={e => setAddrForm({...addrForm, postal_code: e.target.value})} />
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={addAddress}>Save Address</button>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                {[{id:'cod',label:'💰 Cash on Delivery'},{id:'card',label:'💳 Credit/Debit Card'},{id:'upi',label:'📱 UPI'},{id:'netbanking',label:'🏦 Net Banking'}].map(p => (
                  <label key={p.id} className={`payment-option ${paymentMethod === p.id ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value={p.id} checked={paymentMethod === p.id} onChange={() => setPaymentMethod(p.id)} />
                    {p.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="order-items-preview">
              {cart.items.map(item => (
                <div key={item.id} className="preview-item">
                  <div className="preview-img">
                    {item.product.primary_image ? <img src={item.product.primary_image} alt="" /> : <span>🛍️</span>}
                    <span className="preview-qty">{item.quantity}</span>
                  </div>
                  <span className="preview-name">{item.product.name}</span>
                  <span className="preview-price">₹{item.total_price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="coupon-row">
              <input placeholder="Coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="coupon-input" />
              <button className="btn btn-outline btn-sm" onClick={validateCoupon}><FiTag /> Apply</button>
            </div>

            <div className="summary-rows">
              <div className="summary-row"><span>Subtotal</span><span>₹{Number(subtotal).toLocaleString()}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? <span style={{color:'var(--success)'}}>FREE</span> : `₹${shipping}`}</span></div>
              {discount > 0 && <div className="summary-row discount"><span>Discount</span><span>-₹{discount.toFixed(0)}</span></div>}
              <div className="summary-divider"></div>
              <div className="summary-total"><span>Total</span><span>₹{Number(total).toLocaleString()}</span></div>
            </div>

            <button className="btn btn-primary checkout-btn" onClick={placeOrder} disabled={placing || !selectedAddr}>
              {placing ? 'Placing Order...' : '🎉 Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
