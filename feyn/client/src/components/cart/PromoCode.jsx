import React from 'react'
export default function PromoCode({ onApply }) {
  const [code, setCode] = React.useState('');
  const [msg, setMsg] = React.useState(null);
  const VALID = ['FEYN200', 'SAVE10', 'NEWUSER'];

  const apply = () => {
    const c = code.trim().toUpperCase();
    if (!c) { setMsg({ type: 'error', text: 'Please enter a promo code.' }); return; }
    if (VALID.includes(c)) {
      setMsg({ type: 'success', text: `✓ ${c} applied! ₹200 discount added.` });
      onApply?.(200);
    } else {
      setMsg({ type: 'error', text: '✕ Invalid code. Try FEYN200, SAVE10, or NEWUSER.' });
    }
  };

  const msgStyle = msg ? {
    display: 'block', fontSize: 12, padding: '8px 12px', borderRadius: 6, marginBottom: 10,
    background: msg.type === 'success' ? '#f0fff4' : '#fff0f3',
    border: `1px solid ${msg.type === 'success' ? '#388e3c40' : '#ff3f6c30'}`,
    color: msg.type === 'success' ? '#388e3c' : 'var(--red)',
  } : { display: 'none' };

  return (
    <div style={{ background: 'var(--card)', borderRadius: 12, padding: '16px 20px', boxShadow: 'var(--shadow)' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Promo Code</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={code} onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="Enter promo code"
          style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-body)', background: '#fafafa', outline: 'none', letterSpacing: 1 }}
        />
        <button onClick={apply} style={{ padding: '10px 16px', background: '#1a1a2e', color: 'var(--blue)', border: 'none', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 600, cursor: 'pointer' }}>Apply</button>
      </div>
      <div style={msgStyle}>{msg?.text}</div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 500 }}>Popular codes</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {VALID.map(c => (
          <button key={c} onClick={() => setCode(c)}
            style={{ padding: '5px 10px', border: '1px dashed var(--blue)', background: '#f0fffe', borderRadius: 6, fontSize: 11, color: '#0a8a90', cursor: 'pointer', fontWeight: 500 }}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}