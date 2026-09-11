import { useState, useEffect, useCallback } from 'react';
import { fetchCryptoPrices, fetchGlobalMarketData } from '../services/cryptoService';
import { storageService } from '../services/storageService';

export const useCryptoTracker = (initialInterval = 10000) => {
  const [cryptos, setCryptos] = useState([]);
  const [globalMetrics, setGlobalMetrics] = useState(null);
  const [status, setStatus] = useState('inactivo'); // 'inactivo' | 'ejecutando' | 'exito' | 'error'
  const [isAutoActive, setIsAutoActive] = useState(true);
  const [intervalMs, setIntervalMs] = useState(initialInterval);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [logs, setLogs] = useState(() => storageService.getLogs());
  const [cycleCount, setCycleCount] = useState(0);

  // Función principal de carga y sincronización
  const executeSyncCycle = useCallback(async () => {
    setStatus('ejecutando');
    try {
      const [{ data, latency, fetchedAt }, globalData] = await Promise.all([
        fetchCryptoPrices(),
        fetchGlobalMarketData(),
      ]);

      setCryptos(data);
      if (globalData) setGlobalMetrics(globalData);
      setStatus('exito');
      setLastUpdated(fetchedAt);
      setErrorMessage('');
      setCycleCount((prev) => prev + 1);

      // Registrar evento exitoso en el historial de logs
      const updatedLogs = storageService.addLog({
        type: 'AUTO_REFRESH_SUCCESS',
        message: `Sincronización exitosa (${data.length} activos consultados)`,
        latency: `${latency}ms`,
        status: 'OK',
      });
      setLogs(updatedLogs);

    } catch (error) {
      console.error('Error en ciclo de sincronización:', error);
      setStatus('error');
      const msg = error.message || 'Fallo de red al conectar con CoinGecko';
      setErrorMessage(msg);

      // Registrar evento de error en el historial
      const updatedLogs = storageService.addLog({
        type: 'AUTO_REFRESH_ERROR',
        message: msg,
        latency: 'N/A',
        status: 'FAIL',
      });
      setLogs(updatedLogs);
    }
  }, []);

  // Efecto del Trigger (Automatización por temporizador)
  useEffect(() => {
    if (!isAutoActive) {
      setStatus('inactivo');
      return;
    }

    // Ejecución inmediata inicial
    executeSyncCycle();

    // Disparador cíclico
    const timerId = setInterval(() => {
      executeSyncCycle();
    }, intervalMs);

    // Limpieza de memoria
    return () => {
      clearInterval(timerId);
    };
  }, [isAutoActive, intervalMs, executeSyncCycle]);

  // Controles del usuario
  const toggleAutoRefresh = () => setIsAutoActive((prev) => !prev);

  const changeInterval = (newInterval) => {
    setIntervalMs(newInterval);
    storageService.addLog({
      type: 'CONFIG_CHANGE',
      message: `Intervalo cambiado a ${newInterval / 1000}s`,
      latency: '-',
      status: 'INFO',
    });
    setLogs(storageService.getLogs());
  };

  const clearAllLogs = () => {
    storageService.clearLogs();
    setLogs([]);
  };

  return {
    cryptos,
    globalMetrics,
    status,
    isAutoActive,
    intervalMs,
    lastUpdated,
    errorMessage,
    logs,
    cycleCount,
    toggleAutoRefresh,
    changeInterval,
    refreshManually: executeSyncCycle,
    clearAllLogs,
  };
};