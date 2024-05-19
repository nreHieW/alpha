const link = process.env.COMPUTE_LINK;
export const getDCFInputs = async (query: string) => {
  const data = (
    await fetch(`/api/ticker?ticker=${encodeURIComponent(query)}`)
  ).json();
  return data;
};

export async function getDCFOutput(inputData: any) {
  if (!inputData) return;
  const response = await fetch("/api/dcf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  });
  const data = await response.json();
  return data;
}
