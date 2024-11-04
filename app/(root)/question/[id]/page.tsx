"use server";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetQuestionById } from "@/lib/actions/question.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Metric from "@/components/shared/Metric";
import ClockIcons from "@/app/public/assets/icons/clock.svg";
import LikeIcon from "@/app/public/assets/icons/like.svg";
import MessageIcon from "@/app/public/assets/icons/message.svg";
import ViewsIcon from "@/app/public/assets/icons/eye.svg";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTags from "@/components/shared/RenderTags";
import Answer from "@/components/Forms/Answer";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

const page = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  const result = await GetQuestionById({ questionId: params.id });

  const { userId: clerkId } = auth();

  let mongoUser;

  if (!clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result?.author?.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={`${result?.author?.picture}`}
              alt={`${result?.author?.name} Profile`}
              width={22}
              height={22}
              className="rounded-full"
            />

            <p className="paragraph-semibold text-dark300_light700">
              {result?.author?.name}
            </p>
          </Link>

          <div className="flex justify-end">
            <Votes
              type={"question"}
              itemId={JSON.stringify(mongoUser?._id)}
              upvotes={result?.upvotes?.length}
              hasUserUpvoted={result?.upvotes?.includes(mongoUser?._id)}
              downvotes={result?.downvotes?.length}
              hasUserDownvoted={result?.downvotes?.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved?.includes(result?._id)}
            />
          </div>
        </div>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl={ClockIcons}
          alt={"clock icon"}
          value={`- asked ${getTimeStamp(result?.createdAt)}`}
          title={``}
          textStyles={"small-medium text-dark400_light700"}
        />

        <Metric
          imgUrl={MessageIcon}
          alt={"Message"}
          value={formatNumber(result?.answers.length)}
          title={" Answers"}
          textStyles={"small-medium text-dark400_light700"}
        />

        <Metric
          imgUrl={ViewsIcon}
          alt={"Views"}
          value={formatNumber(result?.views)}
          title={" Views"}
          textStyles={"small-medium text-dark400_light700"}
        />
      </div>

      <ParseHTML data={result?.content} />

      <div className="mt-8 flex flex-wrap gap-3">
        {/* eslint-disable @typescript-eslint/no-explicit-any */}
        {result?.tags.map((tag: any) => (
          <RenderTags
            key={tag?._id}
            _id={tag?._id}
            name={tag?.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result?._id}
        userId={JSON.stringify(mongoUser?._id)}
        totalAnswers={result?.answers.length}
      />

      <Answer
        question={result?.content}
        questionId={JSON.stringify(result?._id)}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </>
  );
};

export default page;
