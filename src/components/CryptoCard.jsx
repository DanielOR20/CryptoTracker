import React from 'react';

export const CryptoCard = ({ crypto }) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #131c2e 0%, #0d1524 100%)',
        borderRadius: '14px',
        padding: '20px',
        border: '1px solid #1e293b',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={crypto.image} alt={crypto.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <div>
            <div style={{ fontWeight: '700', fontSize: '1rem', color: '#f8fafc' }}>{crypto.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{crypto.symbol}</div>
          </div>
        </div>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '700',
            backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            color: isPositive ? '#10b981' : '#f87171',
            border: `1px solid ${isPositive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          }}
        >
          {isPositive ? '▲ +' : '▼ '}
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>

      <div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>Precio Spot (USD)</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
          ${crypto.current_price >= 1 
            ? crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : crypto.current_price.toFixed(4)}
        </div>
      </div>
    </div>
  );
};