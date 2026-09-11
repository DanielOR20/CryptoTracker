import React, { useState } from 'react';

export const AlertsPage = ({ alertsData, cryptos }) => {
  const { alerts, addAlert, removeAlert, resetAlert } = alertsData;
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [condition, setCondition] = useState('above');
  const [targetPrice, setTargetPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetPrice || isNaN(targetPrice)) return;
    addAlert(selectedCoin, condition, targetPrice);
    setTargetPrice('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Formulario para crear reglas */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '1.3rem' }}>
          Automatización de Reglas de Precio
        </h2>
        <p style={{ margin: '0 0 20px 0', color: '#94a3b8', fontSize: '0.875rem' }}>
          El hook en segundo plano evalúa estas condiciones automáticamente en cada ciclo de actualización.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px', color: '#f8fafc', fontSize: '0.9rem' }}
          >
            {cryptos.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px', color: '#f8fafc', fontSize: '0.9rem' }}
          >
            <option value="above">Sube por encima de (&gt;=)</option>
            <option value="below">Cae por debajo de (&lt;=)</option>
          </select>

          <input
            type="number"
            placeholder="Precio objetivo en USD"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            style={{ backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px', color: '#f8fafc', fontSize: '0.9rem', minWidth: '200px' }}
          />

          <button
            type="submit"
            style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            + Guardar Regla
          </button>
        </form>
      </div>

      {/* Lista de Alertas Configurada */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#f8fafc', fontSize: '1.1rem' }}>Reglas Activas y Disparadas</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {alerts.length === 0 ? (
            <div style={{ color: '#64748b', fontSize: '0.85rem' }}>No hay alertas configuradas.</div>
          ) : (
            alerts.map((alert) => {
              const coin = cryptos.find((c) => c.id === alert.coinId);
              return (
                <div
                  key={alert.id}
                  style={{
                    backgroundColor: '#0f172a',
                    border: `1px solid ${alert.triggered ? '#f59e0b66' : '#334155'}`,
                    padding: '14px 18px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <span style={{ color: '#f8fafc', fontWeight: '600' }}>{coin ? coin.name : alert.coinId}</span>
                    <span style={{ color: '#94a3b8', margin: '0 8px' }}>
                      {alert.condition === 'above' ? '≥' : '≤'} ${alert.targetPrice.toLocaleString()}
                    </span>
                    {alert.triggered ? (
                      <span style={{ backgroundColor: '#78350f', color: '#fde68a', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                        DISPARADA ({alert.triggeredAt || 'Reciente'})
                      </span>
                    ) : (
                      <span style={{ backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px' }}>
                        En espera
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {alert.triggered && (
                      <button
                        onClick={() => resetAlert(alert.id)}
                        style={{ backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        Reiniciar
                      </button>
                    )}
                    <button
                      onClick={() => removeAlert(alert.id)}
                      style={{ backgroundColor: '#450a0a', color: '#fca5a5', border: '1px solid #991b1b', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};