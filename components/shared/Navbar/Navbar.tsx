import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/public/assets/images/site-logo.svg";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "./GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href={"/"} className="flex items-center gap-1">
        <Image src={Logo} alt="DevFlow" width={23} height={23} />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">OverFlow</span>
        </p>
      </Link>

      {/* WE WOULD HAVE A COMPONENT CALLED GLOBAL SEARCH */}
      <GlobalSearch />

      <div className="flex-between gap-5">
        <Theme />

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
