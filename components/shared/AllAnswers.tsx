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
                    src={`${answer?.author?.clerkId}`}
                    alt={`${answer?.author?.name}`}
                    width={18}
                    height={18}
                    className="rounded-full"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer?.author?.name}
                    </p>

                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      <span className="max-sm:hidden">
                        {` - answered ${getTimeStamp(answer?.createdAt)}`}
                      </span>
                    </p>
                  </div>
                </Link>

                <div className="flex justify-end">
                </div>
              </div>

            </div>
              <ParseHTML data={answer?.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
