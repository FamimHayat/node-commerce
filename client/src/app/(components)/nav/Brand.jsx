import Link from "next/link";

export default function Brand() {
  return (
    <Link
      href="/"
      className="text-4xl lg:text-5xl font-semibold tracking-tighter text-foreground"
    >
      <span className="hidden sm:flex">famim hayat</span>
      <span className="sm:hidden">fh</span>
    </Link>
  );
}
