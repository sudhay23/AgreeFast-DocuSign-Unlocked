import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="w-full px-[72px] py-10">
      <Link href={"/"} className="flex items-center gap-1 cursor-pointer">
        <Image src={"/logo.png"} alt="Logo" width={50} height={70} />
        <h1 className="font-medium text-[24px] text-black">agreefast</h1>
      </Link>
    </nav>
  );
};
