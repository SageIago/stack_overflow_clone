import LocalSearch from "@/components/shared/Search/LocalSearch";
import SearchIcon from "@/app/public/assets/icons/search.svg";
import Filter from "@/components/shared/Filter";
import { QuestionFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/Cards/QuestionCard";
import { GetSavedQuestions } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs/server";

const Home = async () => {
  // Get the user first

  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const results = await GetSavedQuestions({
    clerkId: userId,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={"/"}
          iconPosition={"left"}
          imgSrc={SearchIcon}
          placeholder={"Search Questions"}
          otherClasses={"flex-1"}
        />

        <Filter
          filters={QuestionFilters}
          otherClasses={"min-h-[56px] sm:min-w-[170px]"}
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-3">
        {(results?.questions ?? []).length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          results?.questions.map((question: any) => (
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
            title={"There aren't any Saved Questions Yet!"}
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

export default Home;
