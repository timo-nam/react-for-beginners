import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const [usd, setUsd] = useState(0);
  const [currencyInfo, setCurrencyInfo] = useState();

  const onTyping = (event) => setUsd(event.target.value);
  const onSelect = (event) => {
    const selectionInfo = event.target.value.split(",");
    setCurrencyInfo({
      value: Number(selectionInfo[0]),
      symbol: selectionInfo[1]
    });
  }
  
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        const defaultOption = json[0];
        setCurrencyInfo({
          value: defaultOption.quotes.USD.price,
          symbol: defaultOption.symbol
        });

        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      <div>
        <input
          id="usd"
          value={usd}
          onChange={onTyping}
          type="number"
        />
        <label htmlFor="usd">USD</label>
      </div>
      {loading ? null : (
        <div>
        <input
          id="currency"
          value={usd / currencyInfo.value}
          type="number"
          disabled
        />
        <label htmlFor="currency">{currencyInfo.symbol}</label>
        </div>
      )}
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect}>
          {coins.map((coin) => (
            <option key={coin.id} value={[coin.quotes.USD.price, coin.symbol]}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
