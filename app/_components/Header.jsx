import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-sm items-center">
      <Image src={"/logo.jpg"} alt="Logo" width={120} height={100} />
      <Link
        href="/sign-in"
        className="inline-flex items-center rounded border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition"
      >
        Sign In
      </Link>
    </div>
  );
}

export default Header;
