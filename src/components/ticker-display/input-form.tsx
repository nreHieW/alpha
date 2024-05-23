"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserDCFInputs } from "./types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { encodeInputs } from "./dataHelpers";
import { usePathname, useRouter } from "next/navigation";
import InfoHover from "../info-hover";
import Link from "next/link";

function InputForm({ defaults }: { defaults: UserDCFInputs }) {
  const router = useRouter();
  const userDCFInputSchema = z.object({
    revenues: z.coerce.number(),
    revenue_growth_rate_next_year: z.coerce.number(),
    operating_income: z.coerce.number(),
    operating_margin_next_year: z.coerce.number(),
    compounded_annual_revenue_growth_rate: z.coerce.number(),
    target_pre_tax_operating_margin: z.coerce.number(),
    year_of_convergence_for_margin: z.coerce.number(),
    years_of_high_growth: z.coerce.number(),
    sales_to_capital_ratio_early: z.coerce.number(),
    sales_to_capital_ratio_steady: z.coerce.number(),
    prob_of_failure: z.coerce.number(),
    value_of_options: z.coerce.number(),
  });

  let formDefaults: UserDCFInputs = {
    revenues: defaults.revenues / 1e6,
    revenue_growth_rate_next_year: defaults.revenue_growth_rate_next_year * 100,
    operating_margin_next_year: defaults.operating_margin_next_year * 100,
    operating_income: defaults.operating_income / 1e6,
    compounded_annual_revenue_growth_rate:
      defaults.compounded_annual_revenue_growth_rate * 100,
    target_pre_tax_operating_margin:
      defaults.target_pre_tax_operating_margin * 100,
    year_of_convergence_for_margin: defaults.year_of_convergence_for_margin,
    years_of_high_growth: defaults.years_of_high_growth,
    sales_to_capital_ratio_early: defaults.sales_to_capital_ratio_early,
    sales_to_capital_ratio_steady: defaults.sales_to_capital_ratio_steady,
    prob_of_failure: defaults.prob_of_failure * 100,
    value_of_options: defaults.value_of_options / 1e6,
  };
  formDefaults = Object.fromEntries(
    Object.entries(formDefaults).map(([key, value]) => {
      if (typeof value === "number") {
        return [key, parseFloat(value.toFixed(2))];
      }
      return [key, value];
    })
  ) as UserDCFInputs;

  const form = useForm<z.infer<typeof userDCFInputSchema>>({
    resolver: zodResolver(userDCFInputSchema),
    defaultValues: formDefaults,
  });

  const fields = [
    {
      displayLabel: "Revenues",
      key: "revenues",
      tooltip: "Adjust for other sources of revenue.",
      decodeFn: (value: string) => parseFloat(value) * 1e6,
    },
    {
      displayLabel: "Revenue Growth % (next year)",
      key: "revenue_growth_rate_next_year",
      tooltip: "Expected growth rate of revenue for the next year.",
      decodeFn: (value: string) => parseFloat(value) / 100,
    },
    {
      displayLabel: "Operating Income",
      key: "operating_income",
      tooltip: "Adjust for accounting artefacts such as leases, R&D, etc.",
      decodeFn: (value: string) => parseFloat(value) * 1e6,
    },
    {
      displayLabel: "Operating Margin % (next year)",
      key: "operating_margin_next_year",
      tooltip: "Expected operating margin for the next year.",
      decodeFn: (value: string) => parseFloat(value) / 100,
    },
    {
      displayLabel: "Compounded Annual Revenue Growth %",
      key: "compounded_annual_revenue_growth_rate",
      tooltip: "Expected growth rate of revenue for the next 5 years.",
      decodeFn: (value: string) => parseFloat(value) / 100,
    },
    {
      displayLabel: "Target Pre-tax Operating Margin",
      key: "target_pre_tax_operating_margin",
      tooltip: "Target pre-tax operating margin for the company",
      decodeFn: (value: string) => parseFloat(value) / 100,
    },
    {
      displayLabel: "Year of Convergence for Margin",
      key: "year_of_convergence_for_margin",
      tooltip: "Number of years for the margin to converge to the target.",
      decodeFn: (value: string) => parseFloat(value),
    },
    {
      displayLabel: "Years of High Growth",
      key: "years_of_high_growth",
      tooltip: "How long before the company reaches steady state growth.",
      decodeFn: (value: string) => parseFloat(value),
    },
    {
      displayLabel: "Sales/Capital (early)",
      key: "sales_to_capital_ratio_early",
      tooltip: "Measures capital efficiency, used to calculate reinvestment required.",
      decodeFn: (value: string) => parseFloat(value),
    },
    {
      displayLabel: "Sales/Capital (steady)",
      key: "sales_to_capital_ratio_steady",
      tooltip: "Measures capital efficiency, used to calculate reinvestment required.",
      decodeFn: (value: string) => parseFloat(value),
    },
    {
      displayLabel: "Prob of Failure (%)",
      key: "prob_of_failure",
      tooltip: "Probability of company failing",
      decodeFn: (value: string) => parseFloat(value) / 100,
    },
    {
      displayLabel: "Value of Options",
      tooltip: "Value of any options eg. stock options, warrants, etc. Assumed to be 0.",
      decodeFn: (value: string) => parseFloat(value) * 1e6,
    },
  ];
  function onSubmit(values: z.infer<typeof userDCFInputSchema>) {
    const newValues = { ...defaults, ...values };
    const encodedValues = Object.entries(newValues).map(([key, value]) => {
      const field = fields.find((field) => field.key === key);
      return [key, field ? field.decodeFn(String(value)) : value];
    });
    router.push(`?inputs=${encodeInputs(Object.fromEntries(encodedValues))}`);
  }

  const baseUrl = usePathname();
  const { reset } = form;
  return (
    <>
      <Accordion type="single" collapsible defaultValue={"inputs"} className="w-full">
        <AccordionItem
          value="inputs"
          className="w-full"
        >
          <AccordionTrigger>Inputs</AccordionTrigger>
          <AccordionContent>
            <p className="text-xs text-muted-foreground/60 pb-3">
              All values are in USD Millions or Percentages
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1 flex flex-col"
                id="inputs"
              >
                {Object.keys(defaults).map((inputField, index) => (
                  <FormField
                    key={index}
                    name={inputField.toLowerCase().replace(/ /g, "_")}
                    render={({ field }) => (
                      <FormItem key={index} className="flex">
                        <FormLabel
                          className="place-content-center py-3 pr-2 text-xs w-1/3"
                        >
                          {fields[index]["displayLabel"]}
                        </FormLabel>{" "}
                        <div className="pt-3 pr-8 ">
                          <InfoHover text={fields[index]["tooltip"]} />
                        </div>
                        <FormControl>
                          <div className="w-full pr-1">
                            <Input
                              {...field}
                              placeholder={formDefaults[inputField]?.toFixed(2)}
                            />
                            <FormMessage className="text-xs mt-1" />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
                <div className="self-end pt-3">
                  <Button
                    onClick={() => {
                      reset();
                    }}
                    variant={"outline"}
                    className="mr-5"
                  >
                    <Link href={baseUrl}>Revert</Link>
                  </Button>
                  <Button type="submit" variant={"outline"}>
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default InputForm;
