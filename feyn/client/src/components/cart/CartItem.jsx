import React from 'react'
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
export default function CartItem() {
  const {cartItems} = useCart();
  const [quantities, setQuantities] = React.useState(
  cartItems.reduce((acc, item) => ({
    ...acc,
    [item.id]: item.quantity || 1
  }), {})
);
  const [removed, setRemoved] = React.useState({});

  const adjust = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, Math.min(10, prev[id] + delta))
    }));
  };
  console.log(cartItems);
  return (
    <div style={{ background: 'var(--card)', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow)', marginBottom: 16 }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}><Link to="/">My Cart</Link></span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{cartItems.length} items</span>
      </div>

      {cartItems.map((item, i) => !removed[item.id] && (
        <div key={cartItems.id} style={{ padding: '16px 20px', display: 'flex', gap: 14, borderBottom: i < cartItems.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
          <img src={item.image} alt={item.name} style={{ width: 80, height: 80, borderRadius: 8, border: '1px solid var(--border)', objectFit: 'contain', background: '#fafafa' }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
              {item.name} <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>{item.variant|| ""}</span>
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{item.spec || ""}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-display)' }}>₹{item.price.toLocaleString()}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{(item.mrp || item.price).toLocaleString()}</span>
              <span style={{ fontSize: 11, background: 'var(--yellow)', color: 'var(--text-primary)', padding: '2px 7px', borderRadius: 4, fontWeight: 600 }}>
                {Math.round((1 - item.price / item.mrp) * 100)}% off
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
                <button onClick={() => adjust(item.id, -1)} style={{ width: 30, height: 30, border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: 16, fontWeight: 500 }}>−</button>
                <span style={{ width: 36, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{quantities[item.id]}</span>
                <button onClick={() => adjust(item.id, 1)} style={{ width: 30, height: 30, border: 'none', background: '#f5f5f5', cursor: 'pointer', fontSize: 16, fontWeight: 500 }}>+</button>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Save for later</button>
                <button onClick={() => setRemoved(prev => ({ ...prev, [item.id]: true }))} style={{ fontSize: 12, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}