import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
function Header() {
  return (
    <div className="flex justify-between p-5 shadow-sm items-center">
      <Image src={"/favicon.png"} alt="favicon" width={40} height={40} />
      <UserButton />
    </div>
  );
}

export default Header;
