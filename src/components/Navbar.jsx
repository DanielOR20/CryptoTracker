import React from 'react';

export const Navbar = ({ activeTab, setActiveTab, cycleCount, status }) => {
  const tabs = [
    { id: 'dashboard', label: '📊 Mercado en Vivo' },
    { id: 'automation', label: '⚙️ Logs & Automatización' },
    { id: 'alerts', label: '🔔 Reglas de Alerta' },
  ];

  return (
    <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '0 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.6rem' }}>⚡</span>
          <div>
            <div style={{ color: '#f8fafc', fontWeight: '700', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
              CryptoFlow Auto
            </div>
            <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
              Ciclos ejecutados: <strong style={{ color: '#38bdf8' }}>{cycleCount}</strong>
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '8px' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  transition: 'all 0.2s',
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