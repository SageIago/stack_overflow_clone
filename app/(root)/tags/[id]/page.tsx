/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionCard from "@/components/Cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import SearchIcon from "@/app/public/assets/icons/search.svg";
import { HomePageFilters } from "@/constants/filters";
import { GetQuestionsByTagId } from "@/lib/actions/tags.action";
import React from "react";
import { URLProps } from "@/types";

const Page = async ({ params, searchParams }: URLProps) => {
  const results = await GetQuestionsByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{results?.TagTitle}</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={"/"}
          iconPosition={"left"}
          imgSrc={SearchIcon}
          placeholder={"Search Questions"}
          otherClasses={"flex-1"}
        />

        <Filter
          filters={HomePageFilters}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
          containerClasses={"hidden max-md:flex"}
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-3">
        {results?.questions?.length > 0 ? (
          results?.questions?.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              tags={question.tags}
              title={question.title}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title={"There’s no question to show."}
            description={
              "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            }
            route={"/ask-question"}
            linktext={"Ask a Question"}
          />
        )}
      </div>
    </>
  );
};

export default Page;
