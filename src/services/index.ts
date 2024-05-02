import axios from "axios";

export function setupAlphaAPI() {
  return axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_URL_PORT_PROD || "https://www.alphavantage.co",
  });
}

export const alphaAPI = setupAlphaAPI();

export function setupNextAPI() {
  return axios.create({
    baseURL: "http://localhost:3000/api",
  });
}

export const nextAPI = setupNextAPI();
