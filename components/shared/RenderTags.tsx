import Link from "next/link";
import { Badge } from "../ui/badge";

interface TagsProps {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTags = ({ _id, name, totalQuestions, showCount }: TagsProps) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
        <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-[5px] px-4 py-2 uppercase">{name}</Badge>

        {showCount && (
            <p className="small-medium text-dark500_light700">{totalQuestions}</p>
        )}     
    </Link>
  )
};

export default RenderTags;
