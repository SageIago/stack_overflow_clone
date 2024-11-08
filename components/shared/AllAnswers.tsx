/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnswerFilters } from "@/constants/filters";
import { GetAllAnswers } from "@/lib/actions/answer.action";
import { getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Filter from "./Filter";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: string;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await GetAllAnswers({
    questionId,
  });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result?.Answers?.map((answer: any) => (
          <article key={answer?._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer?.author.clerkId}`}
                  className="flex flex-1 items-start gap-1"
                >
                  <Image
                    src={answer?.author?.picture}
                    alt={answer?.author?.name}
                    width={18}
                    height={18}
                    className="rounded-full"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold mr-2 text-dark-300 dark:text-light-700">
                      <p>{answer?.author?.name}</p>
                    </p>

                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      <span className="max-sm:hidden">
                        {` - answered ${getTimeStamp(answer?.createdAt)}`}
                      </span>
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex justify-end">
                  <Votes
                    type={"Answer"}
                    itemId={JSON.stringify(answer?._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer?.upvotes?.length}
                    hasupVoted={answer?.upvotes?.includes(userId)}
                    downvotes={answer?.downvotes?.length}
                    hasdownVoted={answer?.downvotes?.includes(userId)}
                  />
                </div>
            </div>

            <div className="text-dark-200 dark:text-light-800">
              <ParseHTML data={answer?.content} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
