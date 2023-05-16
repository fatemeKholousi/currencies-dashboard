import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {ICoin} from '../interfaces/ICoin'
function useCoins({currency='usd',pageNumber} :{currency:string,pageNumber:number}){
      return useQuery<ICoin[], Error>({
        queryKey: ["coins",currency,pageNumber],
        queryFn: ()=> axios
          .get<ICoin[]>(
           `https://api.coingecko.com/api/v3/coins/markets`,{params:{page:pageNumber,vs_currency:currency,per_page:20}}
          )
          .then((res) => {
            return res.data;
          }),
      });
}


export default useCoins