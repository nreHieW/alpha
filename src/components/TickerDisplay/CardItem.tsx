import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

const CardItem = async ({
  children,
  footerChildren,
  title,
  description,
}: {
  children: ReactNode;
  footerChildren?: ReactNode;
  title: string;
  description?: string;
}) => {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footerChildren}</CardFooter>
    </Card>
  );
};

export default CardItem;
