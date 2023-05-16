import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useCurrencies() {
  return useQuery<string[], Error>({
    queryKey: ["supportedCurrencies"],
    queryFn: ({ signal }) =>
      axios
        .get<string[]>("https://api.coingecko.com/api/v3/simple/supported_vs_currencies", {
          signal,
        })
        .then((res) => {
          return res.data;
        }),
  });
}

export default useCurrencies;
