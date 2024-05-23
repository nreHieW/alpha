import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";
import InfoHover from "../info-hover";

const CardItem = async ({
  children,
  footerChildren,
  title,
  tooltip,
}: {
  children: ReactNode;
  footerChildren?: ReactNode;
  title: string;
  tooltip?: string;
}) => {
  return (
    <Card className="w-100 h-full flex flex-col bg-slate-50 dark:bg-zinc-950">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row">
            {title}
            <div className="ml-2">
              {" "}
              <InfoHover text={tooltip || ""}></InfoHover>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">{children}</CardContent>
      <CardFooter className="mt-auto">{footerChildren}</CardFooter>
    </Card>
  );
};

export default CardItem;
