import React from 'react';

export const Navbar = ({ activeTab, setActiveTab, cycleCount }) => {
  const tabs = [
    { id: 'dashboard', label: 'Mercado Spot' },
    { id: 'automation', label: 'Monitor & Logs' },
    { id: 'alerts', label: 'Reglas de Alerta' },
  ];

  return (
    <header style={{ backgroundColor: '#0e121b', borderBottom: '1px solid #1c2333', padding: '0 24px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#000', fontSize: '0.85rem' }}>
            ⚡
          </div>
          <div>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.05rem', letterSpacing: '0.3px' }}>
              CryptoFlow <span style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: '500', border: '1px solid #0284c7', padding: '1px 5px', borderRadius: '4px' }}>AUTO</span>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.72rem' }}>
              Ciclos ejecutados: <strong style={{ color: '#10b981' }}>{cycleCount}</strong>
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '6px' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#1e2638' : 'transparent',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  transition: '0.15s',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};