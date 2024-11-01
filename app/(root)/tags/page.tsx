import LocalSearch from "@/components/shared/Search/LocalSearch";
import SearchIcon from "@/app/public/assets/icons/search.svg";
import Filter from "@/components/shared/Filter";
import { UserFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import { GetAllTags } from "@/lib/actions/tags.action";
import Link from "next/link";

const Page = async () => {
  const result = await GetAllTags();
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={"/tags"}
          iconPosition={"left"}
          imgSrc={SearchIcon}
          placeholder={"Look through the Trending Tags"}
          otherClasses={"flex-1"}
        />

        <Filter
          filters={UserFilters}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {(result?.tags ?? []).length > 0 ? (
          result?.tags.map((tag) => (
            <Link href={`/tags/${tag?._id}`} key={tag?._id} className="shadow-light100_dark100 background-light900_dark200 flex w-full flex-col rounded-3xl px-8 py-10  sm:w-[260px]">
                <article>
                    <div className="background-light800_dark400 w-fit rounded-[10px] px-5 py-1.5">
                        <p>{tag?.name}</p>
                    </div>

                    <p className="small-medium text-dark400_light500 mt-3.5">
                        <span className="body-semibold primary-text-gradient mr-2">{tag?.questions.length}+</span>Questions
                    </p>
                </article>
            </Link>
          ))
        ) : (
          <NoResult
            title={"Looks like there are no tags yet."}
            description={
              "Be the first to break the silence! 🚀 Launch with the most trending tags. With Devflow, your question can trend with the most latest tags possible."
            }
            route={"/ask-question"}
            linktext={"Start the Discussion"}
          />
        )}
      </section>
    </>
  );
};

export default Page;


