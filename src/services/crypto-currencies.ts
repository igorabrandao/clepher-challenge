import { CryptoResponse } from "@Application/interfaces/cryptoData";
import { nextAPI } from ".";

export async function getDataFromAPI(symbol: string, functionType: string) {
  const response = await nextAPI.get<CryptoResponse>("crypto-currencies", {
    params: {
      function: functionType,
      from_currency: symbol,
    },
  });
  return response.data;
}
