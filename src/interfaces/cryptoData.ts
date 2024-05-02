export interface CryptoResponse {
  "Meta Data": MetaData;
  "Time Series (Digital Currency Daily)": {
    [key: string]: TimeSeriesDigitalCurrencyDaily;
  };
}

export interface MetaData {
  "1. Information": string;
  "2. Digital Currency Code": string;
  "3. Digital Currency Name": string;
  "4. Market Code": string;
  "5. Market Name": string;
  "6. Last Refreshed": Date;
  "7. Time Zone": string;
}

export interface TimeSeriesDigitalCurrencyDaily {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}
