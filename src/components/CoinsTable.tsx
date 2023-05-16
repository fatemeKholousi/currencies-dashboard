import { useEffect } from "react";
import useCoins from "../hooks/useCoins";

function CoinsTable({
  selectedCurrency,
  selectedPage,
  setLoadingTable,
}: {
  selectedCurrency: string;
  selectedPage: number;
  setLoadingTable: (value: boolean) => void;
}) {
  const selectedCurrencyVariable = selectedCurrency;

  const {
    data: coins,
    error,
    isLoading,
  } = useCoins({
    currency: selectedCurrencyVariable,
    pageNumber: selectedPage,
  });
  useEffect(() => {
    setLoadingTable(isLoading);
  }, [isLoading]);

  return (
    <div>
      <table className="w-[50vw] text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-300 uppercase bg-gray-500">
          <tr className="h-[10vh]">
            <th className="pl-4">#</th>
            <th className="text-center">Coin</th>
            <th>Price</th>
            <th>24h</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td>{error?.message}</td>
            </tr>
          ) : isLoading ? (
            <tr>
              <td>Is Loading...</td>
            </tr>
          ) : (
            coins?.map((coin, index) => (
              <tr className="h-20" key={index}>
                <td className="pl-4">{coin.market_cap_rank}</td>
                <td>
                  <div className="flex items-center gap-2 justify-center">
                    <img className="w-8 h-8 rounded-full" src={coin.image} alt="Avatar" />
                    <p>{coin.name}</p>
                    <p className="text-sm text-gray-600">({coin.symbol})</p>
                  </div>
                </td>

                <td>${coin.current_price.toLocaleString()}</td>
                <td
                  className={`font-medium	${
                    coin.price_change_percentage_24h > 0 ? "text-green-800" : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h}
                </td>
                <td>${coin.total_volume.toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CoinsTable;
