import { cn, formatNumber } from "@/lib/utils";
import Image from "next/image";
import GoldIcons from "@/app/public/assets/icons/gold-medal.svg";
import SilverIcons from "@/app/public/assets/icons/silver-medal.svg";
import BronzeIcons from "@/app/public/assets/icons/bronze-medal.svg";

interface Props {
  totalQuestions: number | undefined;
  totalAnswers: number | undefined;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div>
      <div
        className={cn(
          "rounded-[10px] light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-4 border p-6 shadow-light-300 dark:shadow-dark-200"
        )}
      >
        <Image src={imgUrl} alt={title} width={40} height={50} />

        <div>
          <p className="paragraph-semibold text-dark200_light900">
            {formatNumber(value)}
          </p>

          <p className="body-medium text-dark400_light700">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default function Stats({ totalQuestions, totalAnswers }: Props) {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div
          className={cn(
            "rounded-[10px] light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 border p-6 shadow-light-300 dark:shadow-dark-200"
          )}
        >
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestions ?? 0)}
            </p>

            <p className="body-medium text-dark400_light700">Questions</p>
          </div>

          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers ?? 0)}
            </p>

            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>

        <StatsCard imgUrl={GoldIcons} value={0} title={"Gold Badge"} />
        <StatsCard imgUrl={SilverIcons} value={0} title={"Bronze Badge"} />
        <StatsCard imgUrl={BronzeIcons} value={0} title={"Silver Badge"} />
      </div>
    </div>
  );
}
