"use client";

import React, { useState, useEffect } from "react";
import { theme } from "@Application/styles/theme";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { nextAPI } from "@Application/services";
// import { mockData } from "@Application/mock/mockCryptoData";
ChartJS.register(...registerables);

const periodOptions = {
  DAILY: "DIGITAL_CURRENCY_DAILY",
  WEEKLY: "DIGITAL_CURRENCY_WEEKLY",
  MONTHLY: "DIGITAL_CURRENCY_MONTHLY",
};

const periodKey = {
  DAILY: "Time Series (Digital Currency Daily)",
  WEEKLY: "Time Series (Digital Currency Weekly)",
  MONTHLY: "Time Series (Digital Currency Monthly)",
};

type PeriodKey =
  | "Time Series (Digital Currency Daily)"
  | "Time Series (Digital Currency Weekly)"
  | "Time Series (Digital Currency Monthly)";

interface CryptoData {
  [key: string | PeriodKey]: {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    };
  };
}

export default function Home() {
  const [chartType, setChartType] = useState("line");
  const [symbol, setSymbol] = useState("ETH");
  const [period, setPeriod] = useState<keyof typeof periodOptions>("DAILY");
  const [cryptoData, setCryptoData] = useState<{ data: CryptoData } | null>(
    null
  );
  const [key, setKey] = useState(periodKey["DAILY"]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await nextAPI.get("crypto-currencies", {
        params: {
          symbol: symbol,
          function: periodOptions[period],
        },
      });

      setCryptoData(data);
    }

    fetchData();
  }, [symbol, period]);

  useEffect(() => {
    setKey(periodKey[period]);
  }, [period]);

  const dates = Object.keys(cryptoData?.data[key] ?? {});

  const closingPrices = dates.map((date) => {
    const dataForKey = cryptoData?.data[key];
    const dataForDate = dataForKey?.[date];
    return dataForDate ? parseFloat(dataForDate["4. close"]) : 0;
  });
  const openingPrices = dates.map((date) => {
    const dataForKey = cryptoData?.data[key];
    const dataForDate = dataForKey && dataForKey[date];
    return dataForDate ? parseFloat(dataForDate["1. open"]) : 0;
  });

  const highPrices = dates.map((date) => {
    const dataForKey = cryptoData?.data[key];
    const dataForDate = dataForKey && dataForKey[date];
    return dataForDate ? parseFloat(dataForDate["2. high"]) : 0;
  });

  const lowPrices = dates.map((date) => {
    const dataForKey = cryptoData?.data[key];
    const dataForDate = dataForKey && dataForKey[date];
    return dataForDate ? parseFloat(dataForDate["3. low"]) : 0;
  });

  const volumePrices = dates.map((date) => {
    const dataForKey = cryptoData?.data[key];
    const dataForDate = dataForKey && dataForKey[date];
    return dataForDate ? parseFloat(dataForDate["5. volume"]) : 0;
  });

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "closing price",
        data: closingPrices,
        fill: false,
        borderColor: theme.secondary,
        backgroundColor: theme.secondary,
        tension: 0.1,
      },
      {
        label: "opening price",
        data: openingPrices,
        fill: false,
        borderColor: theme.primary,
        backgroundColor: theme.primary,
        tension: 0.1,
      },
      {
        label: "high price",
        data: highPrices,
        fill: false,
        borderColor: theme.tertiary,
        backgroundColor: theme.tertiary,
        tension: 0.1,
      },
      {
        label: "low price",
        data: lowPrices,
        fill: false,
        borderColor: theme.quaternary,
        backgroundColor: theme.quaternary,
        tension: 0.1,
      },
      {
        label: "volume",
        data: volumePrices,
        fill: false,
        borderColor: theme.quinary,
        backgroundColor: theme.quinary,
        tension: 0.1,
      },
    ],
  };

  const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value);
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSymbol(e.target.value);
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value as keyof typeof periodOptions);
  };

  let chartComponent;
  if (chartType === "line") {
    chartComponent = <Line data={chartData} />;
  } else if (chartType === "bar") {
    chartComponent = <Bar data={chartData} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <h1 className="text-3xl font-bold mb-6">
        Crypto Currencies
        {`( ${period.replace("DIGITAL_CURRENCY_", "")} )`} - {symbol}
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-10">
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className="mb-4 bg-secondary"
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
          </select>

          <select
            value={symbol}
            onChange={handleSymbolChange}
            className="mb-4 bg-secondary"
          >
            <option value="ETH">ETH - Ethereum</option>
            <option value="BTC">BTC - Bitcoin</option>
            <option value="DOGE">DOGE - Dogecoin</option>
            <option value="ADA">ADA - Cardano</option>
            <option value="SOL">SOL - Solana</option>
          </select>

          <select
            value={period}
            onChange={handlePeriodChange}
            className="mb-4 bg-secondary"
          >
            <option value="DAILY">DAILY</option>
            <option value="WEEKLY">WEEKLY</option>
            <option value="MONTHLY">MONTHLY</option>
          </select>
        </div>

        {chartComponent}
      </div>
    </div>
  );
}
