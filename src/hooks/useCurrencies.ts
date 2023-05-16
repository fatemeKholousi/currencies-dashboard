import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

function useCurrencies() {
  
    const fetchSupportedCurrencies = () => {
        return axios
          .get<string[]>(
            "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
          )
          .then((res) => {
            return res.data;
          });
      };
      return useQuery<string[], Error>({
        queryKey: ["supportedCurrencies"],
        queryFn: fetchSupportedCurrencies,
      });
}

export default useCurrencies