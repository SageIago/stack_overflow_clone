import Link from "next/link";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";
import LikeIcon from "@/app/public/assets/icons/like.svg";
import MessageIcon from "@/app/public/assets/icons/message.svg";
import ViewsIcon from "@/app/public/assets/icons/eye.svg";
import AvatarIcons from "@/app/public/assets/icons/avatar.svg";
import { formatNumber, getTimeStamp } from "@/lib/utils";

interface Props {
  _id: string;
  tags: { _id: string; name: string }[];
  title: string;
  author: { _id: string ; name: string ; picture: string };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string  | null;
}

const QuestionCard = ({
  clerkId,
  _id,
  tags,
  title,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-medium line-clamp-1 dark:text-light-800">
            {getTimeStamp(createdAt)}
          </span>

          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-bold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {/* If Signed in, add custom actions */}
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={AvatarIcons}
          alt={"user"}
          value={author.name}
          href={`/profile/${author._id}`}
          isAuthor
          title={`  - asked ${getTimeStamp(createdAt)}`}
          textStyles={"small-medium text-dark400_light700"}
        />
        <Metric
          imgUrl={LikeIcon}
          alt={"UpVotes"}
          value={formatNumber(upvotes?.length)}
          title={" Votes"}
          textStyles={"small-medium text-dark400_light700"}
        />
        <Metric
          imgUrl={MessageIcon}
          alt={"Message"}
          value={formatNumber(answers.length)}
          title={" Answers"}
          textStyles={"small-medium text-dark400_light700"}
        />
        <Metric
          imgUrl={ViewsIcon}
          alt={"Views"}
          value={formatNumber(views)}
          title={" Views"}
          textStyles={"small-medium text-dark400_light700"}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
