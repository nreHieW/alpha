import { DCFInputData } from "../components/ticker-display/types";

const baseURL = process.env.URL;
export async function getDCFInputs(query: string) {
  const response = await fetch(
    `${baseURL}/api/ticker?ticker=${encodeURIComponent(query)}`,{ next: { revalidate: 60 } }
  );
  let data = await response.json();
  console.log("Getting DCF Inputs");
  console.log(data);

  return data[0];
}
export async function getPriceHistory(query: string) {
  const response = await fetch(
    `${process.env.URL}/api/py/history?ticker=${encodeURIComponent(query)}`, { next: { revalidate: 60 } }
  );
  let data = await response.json();

  return data.history;
}
export async function getDCFOutput(inputData: DCFInputData) {
  if (!inputData) return;
  
  const response = await fetch(`${process.env.URL}/api/py/dcf`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  });
  const data = await response.json();
  console.log("Getting DCF Output");
  console.log(data);
  return data;
}

