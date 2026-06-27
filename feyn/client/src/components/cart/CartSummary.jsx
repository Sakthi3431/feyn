export default function CartSummary({ subtotal = 63988, discount = 20691, promoSaving = 0 }) {
  const total = subtotal - discount - promoSaving;
  return (
    <div style={{ background: 'var(--card)', borderRadius: 12, padding: '16px 20px', boxShadow: 'var(--shadow)' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Price Details</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Price (3 items)', value: `₹${subtotal.toLocaleString()}`, color: 'var(--text-primary)' },
          { label: 'Discount', value: `− ₹${discount.toLocaleString()}`, color: 'var(--green)' },
          promoSaving > 0 && { label: 'Promo', value: `− ₹${promoSaving.toLocaleString()}`, color: 'var(--green)' },
          { label: 'Delivery', value: 'FREE', color: 'var(--green)' },
        ].filter(Boolean).map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.label}</span>
            <span style={{ fontSize: 13, color: row.color, fontWeight: 500 }}>{row.value}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px dashed var(--border)', paddingTop: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700 }}>Total Amount</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>₹{total.toLocaleString()}</span>
        </div>
        <p style={{ fontSize: 11, color: 'var(--green)', marginTop: 4, fontWeight: 500 }}>You save ₹{(discount + promoSaving).toLocaleString()} on this order</p>
      </div>
      <button style={{ width: '100%', padding: 14, background: '#1a1a2e', color: 'var(--blue)', border: 'none', borderRadius: 10, fontSize: 14, fontFamily: 'var(--font-display)', fontWeight: 700, cursor: 'pointer' }}>
        Place Order
      </button>
    </div>
  );
}