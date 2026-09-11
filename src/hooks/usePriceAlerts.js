import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export const usePriceAlerts = (cryptos) => {
  const [alerts, setAlerts] = useState(() => storageService.getAlerts());
  const [triggeredAlerts, setTriggeredAlerts] = useState([]);

  // Cada vez que la lista de criptos se actualiza, evaluamos las reglas solas
  useEffect(() => {
    if (!cryptos || cryptos.length === 0) return;

    let hasChanges = false;
    const newlyTriggered = [];

    const updatedAlerts = alerts.map((alert) => {
      const currentCoin = cryptos.find((c) => c.id === alert.coinId);
      if (!currentCoin) return alert;

      const isConditionMet =
        alert.condition === 'above'
          ? currentCoin.current_price >= alert.targetPrice
          : currentCoin.current_price <= alert.targetPrice;

      if (isConditionMet && !alert.triggered) {
        hasChanges = true;
        const alertInfo = {
          ...alert,
          triggered: true,
          currentPrice: currentCoin.current_price,
          triggeredAt: new Date().toLocaleTimeString(),
        };
        newlyTriggered.push(alertInfo);

        // Registrar en logs
        storageService.addLog({
          type: 'ALERT_TRIGGERED',
          message: `🚨 Alerta: ${currentCoin.name} alcanzó $${currentCoin.current_price} (${alert.condition === 'above' ? 'Mayor o igual' : 'Menor o igual'} a $${alert.targetPrice})`,
          latency: '-',
          status: 'ALERT',
        });

        return alertInfo;
      }

      return alert;
    });

    if (hasChanges) {
      setAlerts(updatedAlerts);
      storageService.saveAlerts(updatedAlerts);
      setTriggeredAlerts((prev) => [...newlyTriggered, ...prev]);
    }
  }, [cryptos]);

  const addAlert = (coinId, condition, targetPrice) => {
    const newAlert = {
      id: Date.now().toString(),
      coinId,
      condition,
      targetPrice: parseFloat(targetPrice),
      triggered: false,
    };
    const updated = [newAlert, ...alerts];
    setAlerts(updated);
    storageService.saveAlerts(updated);
  };

  const removeAlert = (id) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
    storageService.saveAlerts(updated);
  };

  const resetAlert = (id) => {
    const updated = alerts.map((a) => (a.id === id ? { ...a, triggered: false } : a));
    setAlerts(updated);
    storageService.saveAlerts(updated);
  };

  return {
    alerts,
    triggeredAlerts,
    addAlert,
    removeAlert,
    resetAlert,
  };
};