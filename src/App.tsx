import Dropdown from "./components/Dropdown";
import CoinCards from "./components/CoinCards";
import { useState } from "react";

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [page, setPage] = useState(1);

  const pageNumbers = Array.from({ length: 10 }, (v, index: number) => index);
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-start">
          <div className="ml-4 my-4">
            <Dropdown
              selectedCurrency={selectedCurrency}
              onChangeCurrency={(selected: string) =>
                setSelectedCurrency(selected)
              }
            />
          </div>
          <CoinCards selectedCurrency={selectedCurrency} selectedPage={page} />
        </div>
      </div>
      <div className="flex justify-center gap-4 my-6 ">
        {pageNumbers?.map((item) => (
          <div
            onClick={() => setPage(item + 1)}
            className="border px-4 bg-gray-200 rounded-md cursor-pointer font-medium"
          >
            {item + 1}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
