"use client";

import { Button } from "@/components/ui/button";
import Login1 from "@/app/public/assets/icons/account.svg";
import Login2 from "@/app/public/assets/icons/sign-up.svg";
import { sidebarLinks } from "@/constants";
import { SignedOut, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const { userId } = useAuth()
  const pathname = usePathname();
  return (
    <aside className="background-light900_dark200 light-border custom-scrollbar no-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((links, index) => {
          const isActive =
            (pathname.includes(links.route) && links.route.length > 1) ||
            pathname === links.route;

            if(links.route === "/profile" ) {
              if(userId) {
                links.route = `/profile/${userId}`
              } else {
                return null
              }
            } 
          return (
            <Link
              key={index}
              href={links.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-[6px] text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={links.imgURL}
                alt={links.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-medium" : "base-bold "
                } max-lg:hidden`}
              >
                {links.label}
              </p>
            </Link>
          );
        })}

      </div>
      
        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href={"/sign-in"}>
              <Button className="small-medium btn-secondary text-dark400_light900 min-h-[41px] w-full rounded-[6px] px-4 py-3 shadow-none">
                <Image
                  src={Login1}
                  alt="Login1"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Sign In
                </span>
              </Button>
            </Link>

            <Link href={"/sign-up"}>
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-[6px] border px-4 py-3 shadow-none">
                <Image
                  src={Login2}
                  alt="Login2"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
    </aside>
  );
};

export default LeftSidebar;
