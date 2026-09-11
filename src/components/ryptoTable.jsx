import React, { useState } from 'react';

export const CryptoTable = ({ cryptos, onSelectCoin }) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');

  const filtered = (cryptos || [])
    .filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()) || c.symbol.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return b.current_price - a.current_price;
      if (sortBy === 'change') return b.price_change_percentage_24h - a.price_change_percentage_24h;
      return b.market_cap - a.market_cap;
    });

  return (
    <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', padding: '20px', marginTop: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.1rem' }}>Cotización Detallada</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Buscar por nombre o símbolo..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              padding: '8px 12px',
              borderRadius: '6px',
              color: '#f8fafc',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              padding: '8px 12px',
              borderRadius: '6px',
              color: '#f8fafc',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <option value="market_cap">Mayor Capitalización</option>
            <option value="price">Mayor Precio</option>
            <option value="change">Mayor Variación 24h</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ color: '#64748b', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '12px 8px' }}>Activo</th>
              <th style={{ padding: '12px 8px' }}>Precio USD</th>
              <th style={{ padding: '12px 8px' }}>24h %</th>
              <th style={{ padding: '12px 8px' }}>Máx 24h</th>
              <th style={{ padding: '12px 8px' }}>Mín 24h</th>
              <th style={{ padding: '12px 8px' }}>Volumen 24h</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((coin) => {
              const isPositive = coin.price_change_percentage_24h >= 0;
              return (
                <tr
                  key={coin.id}
                  onClick={() => onSelectCoin && onSelectCoin(coin)}
                  style={{
                    borderBottom: '1px solid #33415555',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#243248')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={coin.image} alt={coin.name} style={{ width: '24px', height: '24px' }} />
                    <span style={{ color: '#f8fafc', fontWeight: '600' }}>{coin.name}</span>
                    <span style={{ color: '#64748b', textTransform: 'uppercase', fontSize: '0.75rem' }}>{coin.symbol}</span>
                  </td>
                  <td style={{ padding: '12px 8px', color: '#f8fafc', fontWeight: '600' }}>
                    ${coin.current_price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '12px 8px', color: isPositive ? '#10b981' : '#f43f5e', fontWeight: '600' }}>
                    {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td style={{ padding: '12px 8px', color: '#94a3b8' }}>
                    ${coin.high_24h?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '12px 8px', color: '#94a3b8' }}>
                    ${coin.low_24h?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '12px 8px', color: '#94a3b8' }}>
                    ${coin.total_volume?.toLocaleString('en-US')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};