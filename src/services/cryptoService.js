// Activos principales
const SYMBOLS = [
  { id: 'bitcoin', symbol: 'BTCUSDT', name: 'Bitcoin', icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { id: 'ethereum', symbol: 'ETHUSDT', name: 'Ethereum', icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { id: 'solana', symbol: 'SOLUSDT', name: 'Solana', icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
  { id: 'cardano', symbol: 'ADAUSDT', name: 'Cardano', icon: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
  { id: 'ripple', symbol: 'XRPUSDT', name: 'XRP', icon: 'https://assets.coingecko.com/coins/images/44/small/ripple.png' },
  { id: 'binancecoin', symbol: 'BNBUSDT', name: 'BNB', icon: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png' },
];

export const fetchCryptoPrices = async () => {
  const startTime = performance.now();
  
  // Consultamos Binance ticker 24hr que es público y sin restricciones CORS
  const res = await fetch('https://api.binance.com/api/v3/ticker/24hr');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const allTickers = await res.json();
  const tickerMap = new Map(allTickers.map((t) => [t.symbol, t]));

  const data = SYMBOLS.map((coin) => {
    const t = tickerMap.get(coin.symbol) || {};
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.replace('USDT', ''),
      image: coin.icon,
      current_price: parseFloat(t.lastPrice || 0),
      price_change_percentage_24h: parseFloat(t.priceChangePercent || 0),
      high_24h: parseFloat(t.highPrice || 0),
      low_24h: parseFloat(t.lowPrice || 0),
      total_volume: parseFloat(t.volume || 0),
      market_cap: parseFloat(t.quoteVolume || 0),
    };
  });

  const endTime = performance.now();
  return {
    data,
    latency: Math.round(endTime - startTime),
    fetchedAt: new Date().toLocaleTimeString(),
  };
};

export const fetchGlobalMarketData = async () => {
  return {
    activeCryptos: 6,
    btcDominance: '54.2',
    ethDominance: '17.8',
    marketCapChange24h: '+2.41',
  };
};