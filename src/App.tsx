import Dropdown from "./components/Dropdown";
import CoinsTable from "./components/CoinsTable";
import { useState, useEffect } from "react";

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [selectedCurrency]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="my-4">
          <Dropdown
            selectedCurrency={selectedCurrency}
            onChangeCurrency={(selected: string) => setSelectedCurrency(selected)}
          />
        </div>
        <h4>You are in page number {page}</h4>
        <CoinsTable
          setLoadingTable={(loading: boolean) => setLoading(loading)}
          selectedCurrency={selectedCurrency}
          selectedPage={page}
        />
      </div>

      <div className="flex justify-center gap-4 my-6 ">
        <button
          className="rounded-lg bg-gray-500 px-4 py-2 font-bold text-gray-200"
          disabled={loading || page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          disabled={loading}
          className="rounded-lg bg-gray-500 px-4 py-2 font-bold text-gray-200"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
