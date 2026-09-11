import React from 'react';

export const LogViewer = ({ logs, onClear }) => {
  const downloadLogsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `automation_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OK': return '#10b981';
      case 'FAIL': return '#ef4444';
      case 'ALERT': return '#f59e0b';
      default: return '#38bdf8';
    }
  };

  return (
    <div style={{ backgroundColor: '#0b1120', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>&gt; Consola de Eventos del Workflow</span>
          <span style={{ color: '#64748b', fontSize: '0.8rem', marginLeft: '12px' }}>({logs.length} registros)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={downloadLogsJSON}
            style={{ backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Exportar JSON
          </button>
          <button
            onClick={onClear}
            style={{ backgroundColor: '#2d1515', color: '#f87171', border: '1px solid #7f1d1d', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Limpiar Historial
          </button>
        </div>
      </div>

      <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {logs.length === 0 ? (
          <div style={{ color: '#475569', fontSize: '0.85rem' }}>No hay registros de ciclos aún.</div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              style={{
                backgroundColor: '#111827',
                padding: '8px 12px',
                borderRadius: '6px',
                borderLeft: `4px solid ${getStatusColor(log.status)}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.8rem',
                gap: '12px',
              }}
            >
              <div>
                <span style={{ color: '#64748b', marginRight: '10px' }}>[{log.timestamp}]</span>
                <span style={{ color: getStatusColor(log.status), fontWeight: 'bold', marginRight: '10px' }}>{log.status}</span>
                <span style={{ color: '#cbd5e1' }}>{log.message}</span>
              </div>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{log.latency}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};