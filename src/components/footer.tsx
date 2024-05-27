import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex border-t-2 mt-28 py-4 text-xxs justify-between text-muted-foreground">
      <Link href="/disclaimer" className="underline">
        Disclaimer
      </Link>
      <Link href="/about" className="underline">
        About val.
      </Link>
      <div className="text-xxs">&copy; {new Date().getFullYear()}</div>
    </div>
  );
}
