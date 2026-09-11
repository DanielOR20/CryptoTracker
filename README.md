# ⚡ CryptoFlow Auto - Dashboard de Monitoreo Cripto en Tiempo Real

Aplicación web desarrollada en **React + Vite** orientada a la supervisión automatizada de cotizaciones de criptomonedas mediante consumo asíncrono de APIs y gestión de ciclos de vida con React Hooks.

---

## 🚀 Características Principales

* **Automatización Cíclica (Polling Trigger):** Implementación de sondeo continuo en segundo plano usando `setInterval` y `useEffect` con limpieza de memoria activa (`clearInterval`).
* **Consumo de Datos en Vivo:** Integración directa con la API pública de **Binance** para obtener precios spot, máximos, mínimos y variaciones porcentuales de 24 horas.
* **Control de Estados Visuales:** Mapeo y renderizado de 4 estados discretos del trigger:
  * `inactivo`: Temporizador en pausa manual.
  * `ejecutando`: Solicitud asíncrona en curso.
  * `exito`: Datos recuperados y parseados correctamente.
  * `error`: Captura de excepciones con manejo de fallos y reintentos.
* **Filtros y Ordenamiento:** Tabla interactiva con búsqueda por texto y ordenamiento por capitalización, precio o variación.
* **Panel de Auditoría (Logs):** Registro secuencial de latencias, timestamps y estado de cada ciclo ejecutado.
* **Reglas de Alerta:** Módulo para programar condiciones de precio personalizadas sobre los activos.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 18 / 19, Vite, JavaScript (ES6+), CSS3.
* **API de Datos:** Binance Public REST API (`/api/v3/ticker/24hr`).
* **Herramienta de Flujos:** n8n para el modelado visual del workflow de automatización.
* **Control de Versiones:** Git y GitHub.

---

## 📂 Estructura del Proyecto

```text
cryptotracker/
├── src/
│   ├── components/       # Componentes reutilizables (CryptoCard, CryptoTable, StatusBadge, LogViewer)
│   ├── hooks/            # Custom hooks con la lógica del temporizador y alertas (useCryptoTracker)
│   ├── pages/            # Vistas principales (DashboardPage, AutomationPage, AlertsPage)
│   ├── routes/           # Manejador de navegación interna (AppRoutes)
│   ├── services/         # Llamadas a la API y peticiones fetch (cryptoService)
│   ├── styles/           # Hojas de estilo y variables globales (global.css)
│   ├── App.jsx           # Componente raíz
│   └── main.jsx          # Punto de entrada de React
├── package.json
└── README.md