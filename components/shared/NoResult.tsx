import Image from "next/image";
import NoResultsImageLight from "@/app/public/assets/images/light-illustration.png";
import NoResultsDark from "@/app/public/assets/images/dark-illustration.png";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
  route: string;
  linktext: string;
}

const NoResult = ({ title, description, route, linktext }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src={NoResultsImageLight}
        alt="No illustration"
        className="block object-contain dark:hidden"
        width={270}
        height={200}
      />

      <Image
        src={NoResultsDark}
        alt="No illustration"
        className="hidden object-contain dark:flex"
        width={270}
        height={200}
      />

      <h2 className="h2-bold text-dark200_light900 mt-9 ">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>

      <Link href={route}>
        <Button className="paragraph-medium mt-5 min-h-[46px] bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          {linktext}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
