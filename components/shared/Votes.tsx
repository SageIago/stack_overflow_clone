"use client";

import Image from "next/image";
import UpvotedIcon from "@/app/public/assets/icons/upvoted.svg";
import UpVoteIcon from "@/app/public/assets/icons/upvote.svg";
import DownVoteIcon from "@/app/public/assets/icons/downvote.svg";
import DownVotedIcon from "@/app/public/assets/icons/downvoted.svg";
import { formatNumber } from "@/lib/utils";

interface VotesProps {
  type: string;
  itemId: string;
  upvotes: number;
  hasUserUpvoted: boolean;
  downvotes: number;
  hasUserDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  upvotes,
  downvotes,
  hasUserUpvoted,
  hasUserDownvoted,
  hasSaved,
}: VotesProps) => {
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        {/* THIS IS FOR THE UPVOTES SECTION */}
        <div className="flex-center gap-1.5 ">
          <Image
            src={`${hasUserUpvoted ? UpvotedIcon : UpVoteIcon}`}
            alt="Votes"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => console.log("Upvoted")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-[10px] p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>

          {/* THIS IS FOR THE DOWNVOTES SECTION */}
          <div className="flex-center gap-1.5 ">
            <Image
              src={`${hasUserDownvoted ? DownVotedIcon : DownVoteIcon}`}
              alt="Votes"
              width={18}
              height={18}
              className="cursor-pointer"
              onClick={() => console.log("Downvoted")}
            />

            <div className="flex-center background-light700_dark400 min-w-[18px] rounded-[10px] p-1">
              <p className="subtle-medium text-dark400_light900">
                {formatNumber(upvotes)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votes;
