import React from 'react';

export const MetricCard = ({ title, value, change, subtitle }) => {
  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '10px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', marginBottom: '8px' }}>
        {title}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
        <span style={{ color: '#f8fafc', fontSize: '1.4rem', fontWeight: '700' }}>{value}</span>
        {change && (
          <span style={{ color: change >= 0 ? '#10b981' : '#f43f5e', fontSize: '0.8rem', fontWeight: '600' }}>
            {change >= 0 ? '▲' : '▼'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{subtitle}</div>
    </div>
  );
};