import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";

export default function MainHeader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex-row flex py-10 justify-between">
      <div className="w-1/2">
        <Logo />
      </div>
      <div className="flex justify-end items-center">
        {children}
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
}
