import { DCFInputData } from "../components/TickerDisplay/types";

const baseURL = process.env.URL;
export async function getDCFInputs(query: string) {
  const response = await fetch(
    `${baseURL}/api/ticker?ticker=${encodeURIComponent(query)}`
  );
  let data = await response.json();
  // console.log("Getting DCF Inputs");

  return data[0];
}
export async function getPriceHistory(query: string) {
  const response = await fetch(
    `${process.env.COMPUTE_LINK}/history?ticker=${encodeURIComponent(query)}`
  );
  let data = await response.json();

  return data.history;
}
export async function getDCFOutput(inputData: DCFInputData) {
  if (!inputData) return;
  const response = await fetch(`${process.env.COMPUTE_LINK}/dcf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  });
  const data = await response.json();
  // console.log("Getting DCF Outputs");
  return data;
}
