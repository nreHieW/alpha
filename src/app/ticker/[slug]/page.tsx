import TickerDisplay from "@/components/ticker-display/ticker-display";
import { Loading } from "@/components/ui/loading";
import type { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const ticker = params.slug.split("-")[0];

  return {
    title: `val. ${ticker}`,
    description: `Valuation for ${ticker}`,
  };
}

export default function TickerDisplayPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const ticker = params.slug.split("-")[0];
  const inputs = (searchParams.inputs as string) || "";

  return (
    <>
      <Suspense fallback={<div className="py-8 justify-center flex">
          <Loading />
        </div>}>
        <TickerDisplay ticker={ticker} userInputs={inputs} />
      </Suspense>
    </>
  );
}
