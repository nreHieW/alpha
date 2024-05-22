import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
export default function InfoHover({ text }: { text: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger style={{ opacity: "30%" }} className="flex h-full">
        <Info style={{ width: "0.9em", height: "0.9em" }}/>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-xs" style={{opacity: "40%"}}>{text}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
