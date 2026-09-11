import React from 'react';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { CryptoCard } from '../components/CryptoCard.jsx';
import { MetricCard } from '../components/MetricCard.jsx';
import { CryptoTable } from '../components/CryptoTable.jsx';

export const DashboardPage = ({ tracker }) => {
  const {
    cryptos,
    globalMetrics,
    status,
    isAutoActive,
    intervalMs,
    lastUpdated,
    errorMessage,
    toggleAutoRefresh,
    changeInterval,
    refreshManually,
  } = tracker;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Barra de estado y control */}
      <div
        style={{
          backgroundColor: 'card-panel',
          borderRadius: '12px',
          border: '1px solid #334155',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <StatusBadge status={status} />
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Última sincronización: <strong style={{ color: '#f8fafc' }}>{lastUpdated || 'Conectando...'}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Frecuencia:</label>
          <select
            value={intervalMs}
            onChange={(e) => changeInterval(Number(e.target.value))}
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              padding: '6px 12px',
              borderRadius: '6px',
              color: '#f8fafc',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <option value={5000}>5 segundos (Rápido)</option>
            <option value={10000}>10 segundos (Normal)</option>
            <option value={30000}>30 segundos</option>
            <option value={60000}>60 segundos</option>
          </select>

          <button
            onClick={toggleAutoRefresh}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              backgroundColor: isAutoActive ? '#ef444422' : '#10b98122',
              color: isAutoActive ? '#f87171' : '#34d399',
              border: `1px solid ${isAutoActive ? '#ef444455' : '#10b98155'}`,
            }}
          >
            {isAutoActive ? '⏸ Pausar Trigger' : '▶ Activar Trigger'}
          </button>

          <button
            onClick={refreshManually}
            disabled={status === 'ejecutando'}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid #334155',
              backgroundColor: '#0f172a',
              color: '#f8fafc',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: status === 'ejecutando' ? 'not-allowed' : 'pointer',
            }}
          >
            🔄 Forzar Ciclo
          </button>
        </div>
      </div>

      {/* Alerta de error */}
      {status === 'error' && (
        <div
          style={{
            backgroundColor: '#450a0a',
            border: '1px solid #991b1b',
            color: '#fca5a5',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.9rem',
          }}
        >
          ⚠️ Error en el ciclo de automatización: {errorMessage}
        </div>
      )}

      {/* Métricas Globales */}
      {globalMetrics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <MetricCard
            title="Activos Registrados"
            value={globalMetrics.activeCryptos?.toLocaleString()}
            subtitle="Mercado global en tiempo real"
          />
          <MetricCard
            title="Dominancia Bitcoin"
            value={`${globalMetrics.btcDominance}%`}
            subtitle="Porcentaje del market cap total"
          />
          <MetricCard
            title="Dominancia Ethereum"
            value={`${globalMetrics.ethDominance}%`}
            subtitle="Segundo activo del mercado"
          />
          <MetricCard
            title="Variación Global 24h"
            value={`${globalMetrics.marketCapChange24h}%`}
            change={parseFloat(globalMetrics.marketCapChange24h)}
            subtitle="Flujo del mercado hoy"
          />
        </div>
      )}

      {/* Grid de Monedas Destacadas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {cryptos.slice(0, 4).map((coin) => (
          <CryptoCard key={coin.id} crypto={coin} />
        ))}
      </div>

      {/* Tabla Completa */}
      <CryptoTable cryptos={cryptos} />
    </div>
  );
};