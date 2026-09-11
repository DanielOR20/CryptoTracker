import React, { useState } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { AutomationPage } from '../pages/AutomationPage.jsx';
import { AlertsPage } from '../pages/AlertsPage.jsx';
import { useCryptoTracker } from '../hooks/useCryptoTracker.js';
import { usePriceAlerts } from '../hooks/usePriceAlerts.js';

export const AppRoutes = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Hook principal de la automatización
  const tracker = useCryptoTracker(10000);
  
  // Hook de alertas automáticas
  const alertsData = usePriceAlerts(tracker.cryptos);

  return (
    <div>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cycleCount={tracker.cycleCount}
        status={tracker.status}
      />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {activeTab === 'dashboard' && <DashboardPage tracker={tracker} />}
        {activeTab === 'automation' && <AutomationPage tracker={tracker} />}
        {activeTab === 'alerts' && <AlertsPage alertsData={alertsData} cryptos={tracker.cryptos} />}
      </main>
    </div>
  );
};