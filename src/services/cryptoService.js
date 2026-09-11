const COINS = ['bitcoin', 'ethereum', 'solana', 'cardano', 'ripple', 'binancecoin'];

const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const fetchCryptoPrices = async () => {
  const startTime = performance.now();
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Error en API CoinGecko: HTTP ${response.status}`);
  }

  const data = await response.json();
  const endTime = performance.now();
  const latency = Math.round(endTime - startTime);

  return {
    data,
    latency,
    fetchedAt: new Date().toLocaleTimeString(),
  };
};

export const fetchGlobalMarketData = async () => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/global');
    if (!res.ok) return null;
    const json = await res.json();
    return {
      activeCryptos: json.data.active_cryptocurrencies,
      btcDominance: json.data.market_cap_percentage.btc?.toFixed(1),
      ethDominance: json.data.market_cap_percentage.eth?.toFixed(1),
      marketCapChange24h: json.data.market_cap_change_percentage_24h_usd?.toFixed(2),
    };
  } catch {
    return null;
  }
};