import TickerDisplay from "@/components/TickerDisplay/TickerDisplay";

export default function TickerDisplayPage({ params, searchParams }: { params: { slug: string }, searchParams: {[key: string]: string | string[] |undefined}}) {
  const ticker = params.slug.split("-")[0];
  const inputs = searchParams.inputs as string || "";

  return (
    <>
    <TickerDisplay ticker={ticker} userInputs={inputs}/>
    </>
  )

}
