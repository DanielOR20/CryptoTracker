import React from 'react';

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    inactivo: {
      label: 'Automatización en pausa',
      color: '#6b7280',
      bg: '#f3f4f6',
      dot: '#9ca3af',
    },
    ejecutando: {
      label: 'Sincronizando con mercado...',
      color: '#2563eb',
      bg: '#eff6ff',
      dot: '#3b82f6',
    },
    exito: {
      label: 'Precios actualizados',
      color: '#059669',
      bg: '#ecfdf5',
      dot: '#10b981',
    },
    error: {
      label: 'Error de conexión',
      color: '#dc2626',
      bg: '#fef2f2',
      dot: '#ef4444',
    },
  };

  const current = statusConfig[status] || statusConfig.inactivo;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: '500',
        backgroundColor: current.bg,
        color: current.color,
        border: `1px solid ${current.dot}33`,
      }}
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: current.dot,
          display: 'inline-block',
        }}
      />
      {current.label}
    </div>
  );
};