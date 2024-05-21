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
import { redirect, usePathname, useRouter } from "next/navigation";


const fields = [
  "Revenues",
  "Revenue Growth % (next year)",
  "Operating Margin % (next year)",
  "Compounded Annual Revenue Growth %",
  "Target Pre-tax Operating Margin",
  "Year of Convergence for Margin",
  "Years of High Growth",
  "Sales/Capital (early)",
  "Sales/Capital (steady)",
  "Prob of Failure (%)",
  "Value of Options",
];

function InputForm({ defaults }: { defaults: UserDCFInputs }) {
  
  const router = useRouter();
  const userDCFInputSchema = z.object({
    revenues: z.coerce.number(),
    revenue_growth_rate_next_year: z.coerce.number(),
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
  const form = useForm<z.infer<typeof userDCFInputSchema>>({
    resolver: zodResolver(userDCFInputSchema),
    defaultValues: {
      revenues: defaults.revenues,
      revenue_growth_rate_next_year: defaults.revenue_growth_rate_next_year * 100,
      operating_margin_next_year: defaults.operating_margin_next_year * 100,
      compounded_annual_revenue_growth_rate:
        defaults.compounded_annual_revenue_growth_rate * 100,
      target_pre_tax_operating_margin: defaults.target_pre_tax_operating_margin * 100,
      year_of_convergence_for_margin: defaults.year_of_convergence_for_margin,
      years_of_high_growth: defaults.years_of_high_growth,
      sales_to_capital_ratio_early: defaults.sales_to_capital_ratio_early,
      sales_to_capital_ratio_steady: defaults.sales_to_capital_ratio_steady,
      prob_of_failure: defaults.prob_of_failure * 100,
      value_of_options: defaults.value_of_options,
    },
  });
  function onSubmit(values: z.infer<typeof userDCFInputSchema>) {
    let newValues = { ...defaults, ...values};
    newValues.revenue_growth_rate_next_year /= 100;
    newValues.operating_margin_next_year /= 100;
    newValues.compounded_annual_revenue_growth_rate /= 100;
    newValues.target_pre_tax_operating_margin /= 100;
    newValues.prob_of_failure /= 100;
    router.push(`?inputs=${encodeInputs(newValues)}`);
  }
  const baseUrl = usePathname();
  const { reset } = form;
  return (
    <>
      <Accordion
        type="single"
        collapsible
        defaultValue={"inputs"}
        className="text-white"
      >
        <AccordionItem
          value="inputs"
          className="w-full"
          style={{ minWidth: "300px" }}
        >
          <AccordionTrigger>Inputs</AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
                id="inputs"
              >
                {Object.keys(defaults).map((inputField, index) => (
                  <FormField
                    // control={form.control}
                    key={index}
                    name={inputField.toLowerCase().replace(/ /g, "_")}
                    render={({ field }) => (
                      <FormItem key={index} className="flex">
                        <FormLabel
                          style={{ display: "block", textAlign: "center" }}
                          className="place-content-center py-3 px-6"
                        >
                          {fields[index]}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={defaults[inputField]?.toFixed(2)}
                            className="text-black"
                          
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="submit">Submit</Button>
                <Button onClick={() => {
                  reset();
                  redirect(baseUrl);
                }}>Revert</Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default InputForm;
