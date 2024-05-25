"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserDCFInputs } from "./types";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
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
import { Switch } from "../ui/switch";

type FieldValue = {
  displayLabel: string;
  key: keyof UserDCFInputs;
  tooltip: string;
  decodeFn: (value: string) => number;
};

function InputForm({ defaults }: { defaults: UserDCFInputs }) {
  const router = useRouter();
  const userDCFInputSchema = z.object({
    revenues: z.coerce.number(),
    revenue_growth_rate_next_year: z.coerce.number(),
    operating_margin_next_year: z.coerce.number(),
    compounded_annual_revenue_growth_rate: z.coerce.number(),
    target_pre_tax_operating_margin: z.coerce.number(),
    year_of_convergence_for_margin: z.coerce.number(),
    discount_rate: z.coerce.number(),
    years_of_high_growth: z.coerce.number(),
    sales_to_capital_ratio_early: z.coerce.number(),
    sales_to_capital_ratio_steady: z.coerce.number(),
    prob_of_failure: z.coerce.number(),
    value_of_options: z.coerce.number(),
    adjust_r_and_d: z.coerce.boolean(),
  });

  let formDefaults: UserDCFInputs = {
    revenues: defaults.revenues / 1e6,
    revenue_growth_rate_next_year: defaults.revenue_growth_rate_next_year * 100,
    operating_margin_next_year: defaults.operating_margin_next_year * 100,
    compounded_annual_revenue_growth_rate:
      defaults.compounded_annual_revenue_growth_rate * 100,
    target_pre_tax_operating_margin:
      defaults.target_pre_tax_operating_margin * 100,
    year_of_convergence_for_margin: defaults.year_of_convergence_for_margin,
    discount_rate: defaults.discount_rate * 100,
    years_of_high_growth: defaults.years_of_high_growth,
    sales_to_capital_ratio_early: defaults.sales_to_capital_ratio_early,
    sales_to_capital_ratio_steady: defaults.sales_to_capital_ratio_steady,
    prob_of_failure: defaults.prob_of_failure * 100,
    value_of_options: defaults.value_of_options / 1e6,
    adjust_r_and_d: defaults.adjust_r_and_d,
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

  const fields: FieldValue[] = [
    {
      displayLabel: "Revenues",
      key: "revenues",
      tooltip: "Adjust for other sources of revenue.",
      decodeFn: (value: string) => parseFloat(value) * 1e6,
    },
    {
      displayLabel: "Next Year Revenue Growth %",
      key: "revenue_growth_rate_next_year",
      tooltip: "Expected growth rate of revenue for the next year.",
      decodeFn: (value: string) => parseFloat(value) / 100,
    },
    {
      displayLabel: "Next Year Operating Margin %",
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
      displayLabel: "Discount Rate %",
      key: "discount_rate",
      tooltip: "Adjust if using a different cost of capital.",
      decodeFn: (value: string) => parseFloat(value) / 100,
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
      tooltip:
        "Measures capital efficiency, used to calculate reinvestment required.",
      decodeFn: (value: string) => parseFloat(value),
    },
    {
      displayLabel: "Sales/Capital (steady)",
      key: "sales_to_capital_ratio_steady",
      tooltip:
        "Measures capital efficiency, used to calculate reinvestment required.",
      decodeFn: (value: string) => parseFloat(value),
    },
    {
      displayLabel: "Prob of Failure %",
      key: "prob_of_failure",
      tooltip:
        "By default, it is calculated using synthetic rating. Adjust if actual rating is known.",
      decodeFn: (value: string) => parseFloat(value) / 100,
    },
    {
      displayLabel: "Value of Options",
      key: "value_of_options",
      tooltip:
        "Value of any options eg. stock options, warrants, etc. Assumed to be 0.",
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
      <Accordion
        type="single"
        collapsible
        defaultValue={"inputs"}
        className="w-full text-base"
      >
        <AccordionItem value="inputs" className="w-full">
          <AccordionTrigger>Inputs</AccordionTrigger>
          <AccordionContent>
            <p className="text-xxs text-muted-foreground/40 text-right">
              For more details on the inputs, please visit{" "}
              <a href="/about#inputs_description" className="underline"
            target="_blank" rel="noopener noreferrer">
                here
        </a>
            </p>
            <p className="text-xs text-muted-foreground/60 pb-3">
              All values are in USD Millions or Percentages
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
                id="inputs"
              >
                {fields.map((item: FieldValue, index) => {
                  return (
                    <FormField
                      key={index}
                      name={item.key as string}
                      render={({ field }) => (
                        <FormItem key={index} className="flex">
                          <FormLabel className="place-content-center pr-2 text-xs w-3/5">
                            {item.displayLabel}
                          </FormLabel>{" "}
                          <div className="pt-2 pr-8 ">
                            <InfoHover text={item.tooltip} />
                          </div>
                          <FormControl>
                            <div className="w-full pr-1">
                              <Input
                                {...field}
                                placeholder={formDefaults[item.key]?.toFixed(2)}
                              />
                              <FormMessage className="text-xs mt-1" />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  );
                })}
                  <FormField
                    control={form.control}
                    name="adjust_r_and_d"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormLabel className="place-content-center text-xs w-3/5 pr-1">
                          Adjust R&D Expense
                        </FormLabel>
                        <div className="pt-1 pr-8">
                          <InfoHover text={'Capitalize R and D expenses as assets. Used to determine sales/capital ratio'} />
                        </div>
                        <div className="w-full">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </div>
                    
                      </FormItem>
                    )}
                  />
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
