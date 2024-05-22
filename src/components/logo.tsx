import { Roboto_Slab } from "next/font/google";
import Link from "next/link";

const logoFont = Roboto_Slab({ subsets: ["latin"] });

export default function Logo() {
  return (
    <div className={`${logoFont.className} text-3xl font-medium`}>
      <Link href={"/"}>val.</Link>
    </div>
  );
}
