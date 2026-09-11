import React from 'react';

export const CryptoCard = ({ crypto }) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <img src={crypto.image} alt={crypto.name} style={{ width: '36px', height: '36px' }} />
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>
            {crypto.name}
          </h3>
          <span style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase' }}>
            {crypto.symbol}
          </span>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
          ${crypto.current_price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: isPositive ? '#059669' : '#dc2626',
          }}
        >
          {isPositive ? '▲ +' : '▼ '}
          {crypto.price_change_percentage_24h?.toFixed(2)}% (24h)
        </div>
      </div>
    </div>
  );
};