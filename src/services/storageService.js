const LOGS_KEY = 'crypto_automation_logs';
const ALERTS_KEY = 'crypto_automation_alerts';
const PORTFOLIO_KEY = 'crypto_portfolio_data';

export const storageService = {
  // Logs de automatización
  getLogs: () => {
    try {
      const data = localStorage.getItem(LOGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addLog: (logEntry) => {
    try {
      const current = storageService.getLogs();
      const newEntry = {
        id: Date.now() + Math.random().toString(36).substring(2, 5),
        timestamp: new Date().toLocaleTimeString(),
        ...logEntry,
      };
      // Guardar los últimos 50 eventos
      const updated = [newEntry, ...current].slice(0, 50);
      localStorage.setItem(LOGS_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Error al guardar log:', e);
      return [];
    }
  },

  clearLogs: () => {
    localStorage.removeItem(LOGS_KEY);
    return [];
  },

  // Reglas de alertas automáticas
  getAlerts: () => {
    try {
      const data = localStorage.getItem(ALERTS_KEY);
      return data ? JSON.parse(data) : [
        { id: '1', coinId: 'bitcoin', condition: 'above', targetPrice: 100000, triggered: false },
        { id: '2', coinId: 'ethereum', condition: 'below', targetPrice: 2000, triggered: false }
      ];
    } catch {
      return [];
    }
  },

  saveAlerts: (alerts) => {
    localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
  },

  // Portafolio
  getPortfolio: () => {
    try {
      const data = localStorage.getItem(PORTFOLIO_KEY);
      return data ? JSON.parse(data) : {
        bitcoin: 0.25,
        ethereum: 1.5,
        solana: 10.0,
        cardano: 500.0,
      };
    } catch {
      return {};
    }
  },

  savePortfolio: (portfolio) => {
    localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
  }
};