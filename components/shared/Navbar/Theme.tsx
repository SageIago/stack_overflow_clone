"use client";

import { useTheme } from "@/context/ThemeProvider";
import Sun from "@/app/public/assets/icons/sun.svg";
import Moon from "@/app/public/assets/icons/moon.svg";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Image
              src={Sun}
              alt="SunImage"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src={Moon}
              alt="SunImage"
              className="active-theme"
              width={20}
              height={20}
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400">
          {themes.map((item, index) => (
            <MenubarItem
              key={index}
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(item.values);

                if (item.values !== "system") {
                  localStorage.theme = item.values;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={item.icon}
                alt={item.values}
                width={16}
                height={16}
                className={`${mode === item.values && "active-theme"} `}
              />

              <p
                className={`body-semibold text-light-500 ${
                  mode === item.values
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
