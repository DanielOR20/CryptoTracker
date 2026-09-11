import React from 'react';
import { LogViewer } from '../components/LogViewer';
import { StatusBadge } from '../components/StatusBadge';

export const AutomationPage = ({ tracker }) => {
  const { logs, cycleCount, status, intervalMs, isAutoActive, clearAllLogs } = tracker;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ margin: '0 0 12px 0', color: '#f8fafc', fontSize: '1.4rem' }}>
          Auditoría y Monitoreo del Flujo Automatizado
        </h2>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Este módulo supervisa el ciclo de vida del disparador en React. Inspecciona cada petición asíncrona,
          calcula la latencia de respuesta del servidor y previene fugas de memoria limpiando los listeners en cada desmontaje.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #334155',
          }}
        >
          <div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Estado del Trigger</div>
            <div style={{ marginTop: '6px' }}><StatusBadge status={status} /></div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Ciclos Ejecutados</div>
            <div style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: 'bold' }}>{cycleCount}</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Frecuencia Configurada</div>
            <div style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: 'bold' }}>{intervalMs / 1000}s</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase' }}>Motor de Sondeo</div>
            <div style={{ color: isAutoActive ? '#34d399' : '#f87171', fontSize: '1rem', fontWeight: 'bold', marginTop: '6px' }}>
              {isAutoActive ? '● setInterval Activo' : '○ En Pausa'}
            </div>
          </div>
        </div>
      </div>

      <LogViewer logs={logs} onClear={clearAllLogs} />
    </div>
  );
};