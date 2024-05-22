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
}: {
  children: ReactNode;
  footerChildren?: ReactNode;
  title: string;
}) => {
  return (
    <Card className="w-1/2 items-end">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row">{title}
          <div className="ml-2">          <InfoHover text="test"></InfoHover></div>
          </div>
          </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">{children}</CardContent>
      <CardFooter >{footerChildren}</CardFooter>
    </Card>
  );
};

export default CardItem;
