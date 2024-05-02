import { alphaAPI } from "@Application/services";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  const functionType = searchParams.get("function");

  try {
    const response = await alphaAPI.get("query", {
      params: {
        function: functionType,
        symbol: symbol,
        market: "USD",
        apikey: process.env.ALPHA_VANTAGE_API_KEY,
      },
    });

    // Extract only the necessary data from the response object
    const responseData = {
      data: response.data, // Assuming response.data contains the actual data
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };

    return new Response(JSON.stringify(responseData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // Handle errors
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
