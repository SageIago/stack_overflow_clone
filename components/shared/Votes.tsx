/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import UpvotedIcon from "@/app/public/assets/icons/upvoted.svg";
import UpVoteIcon from "@/app/public/assets/icons/upvote.svg";
import DownVoteIcon from "@/app/public/assets/icons/downvote.svg";
import StarFilledIcon from "@/app/public/assets/icons/star-filled.svg"
import StarRedIcon from "@/app/public/assets/icons/star-red.svg"
import DownVotedIcon from "@/app/public/assets/icons/downvoted.svg";
import { formatNumber } from "@/lib/utils";
import { DownVoteQuestion, UpvoteQuestion, ToggleSavedQuestion } from "@/lib/actions/question.action";
import { usePathname } from "next/navigation"; 
import { DownvoteAnswer, UpvoteAnswer } from "@/lib/actions/answer.action";

interface VotesProps {
  type: string;
  userId: string;
  itemId: string;
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  userId,
  itemId,
  upvotes,
  downvotes,
  hasupVoted,
  hasdownVoted,
  hasSaved,
}: VotesProps) => {

  const pathname = usePathname()

  async function handleVotes(action: string) {
    if(!userId) {
      return ;
    }

    if(action === "Upvoted") {
      // Call the upvote question API
      if(type === "Question") {
        await UpvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === "Answer") {
        // Call the upvote answer API
        await UpvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      }
       
      return ;
    }

    if(action === "DownVoted") {
      // Call the upvote question API
      if(type === "Question") {
        await DownVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === "Answer") {
        // Call the upvote answer API
        await DownvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      }
    }
    

  

        
  }

  async function handleSave() {
      await ToggleSavedQuestion({
        userId: JSON.parse(userId),
        questionId: JSON.parse(itemId),
        path: pathname
      })
  }

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        {/* THIS IS FOR THE UPVOTES SECTION */}
        <div className="flex-center gap-1.5 ">
          <Image
            src={hasupVoted ? UpvotedIcon : UpVoteIcon}
            alt="Votes"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVotes("Upvoted")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-[10px] p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        {/* THIS IS FOR THE DOWNVOTES SECTION */}
        <div className="flex-center gap-1.5 ">
          <Image
            src={hasdownVoted ? DownVotedIcon : DownVoteIcon}
            alt="Votes"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVotes("DownVoted")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-[10px] p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type !== "Answer" && (
         <Image
         src={hasSaved ? StarFilledIcon : StarRedIcon}
         alt="Star"
         width={18}
         height={18}
         className="cursor-pointer"
         onClick={handleSave}
       />
      ) }
    </div>
  );
};

export default Votes;
