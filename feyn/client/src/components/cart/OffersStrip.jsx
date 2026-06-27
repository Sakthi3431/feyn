const OFFERS = [
  { label: 'Bank Offer', text: '10% off on HDFC Bank Cards, up to ₹1,500 on orders ≥ ₹5,000', accent: 'var(--blue)' },
  { label: 'Special Price', text: 'Extra ₹2,000 off — Limited time deal. No coupon needed.', accent: 'var(--yellow)' },
  { label: 'Partner Offer', text: 'Sign up for Feyn Pay Later and get ₹100 cashback on first transaction', accent: 'var(--green)' },
];

export default function OffersStrip() {
  return (
    <div style={{ background: 'var(--card)', borderRadius: 12, padding: '16px 20px', boxShadow: 'var(--shadow)' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Available Offers</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {OFFERS.map(o => (
          <div key={o.label} style={{ display: 'flex', gap: 10, padding: '10px 12px', background: '#fafafa', borderRadius: 8, borderLeft: `3px solid ${o.accent}` }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{o.label}</p>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{o.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}