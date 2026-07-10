"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineHome } from "react-icons/hi";
import { CiPower } from "react-icons/ci";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

function SideBar() {
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const { signOut } = useClerk(); // 👈 get Clerk's signOut function

  useEffect(() => {
    setMounted(true);
  }, []);

  const Menu = [
    { id: 1, name: "Home", icon: <HiOutlineHome />, path: "/dashboard" },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
  ];

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src="/logo.jpg" alt="Logo" width={120} height={100} />
      <hr className="my-5" />
      <ul>
        {Menu.map((item) => {
          const isActive = mounted && path === item.path;
          return (
            <li
              key={item.id}
              className={`flex items-center gap-2 p-3 cursor-pointer rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black mb-1 ${
                isActive ? "bg-gray-100 text-black" : ""
              }`}
            >
              <Link href={item.path} className="flex items-center gap-2 w-full">
                <div className="text-3xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </Link>
            </li>
          );
        })}

        {/* 🔴 Logout menu item – triggers Clerk signOut */}
        <li
          onClick={() => signOut({ redirectUrl: "/" })} // 👈 sign out and send user to home (or login)
          className="flex items-center gap-2 p-3 cursor-pointer rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black mb-1"
        >
          <div className="text-3xl">
            <CiPower />
          </div>
          <h2>Logout</h2>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
