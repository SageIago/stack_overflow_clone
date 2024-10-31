"use client"

import Image from "next/image";
import SearchIcon from "@/app/public/assets/icons/search.svg";
import { Input } from "@/components/ui/input";
const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-[10px] px-4">
        <Image
          src={SearchIcon}
          alt="Search-Icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          className="paragraph-regular placeholder background-light800_darkgradient border-none shadow-none outline-none"
          placeholder="Search Globally"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
