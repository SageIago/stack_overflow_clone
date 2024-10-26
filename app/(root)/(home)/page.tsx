import LocalSearch from "@/components/shared/Search/LocalSearch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchIcon from "@/app/public/assets/icons/search.svg";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/shared/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/Cards/QuestionCard";
import { GetQuestions } from "@/lib/actions/question.action";

const Home = async () => {
  const questions = [
    {
      _id: "1",
      title: "How to use React Router",
      tags: [
        { _id: "1", name: "React" },
        { _id: "2", name: "React Router" },
      ],
      author: {
        _id: "a1",
        name: "John Doe",
        picture: "https://example.com/johndoe.jpg",
      },
      upvotes: 1000000000,
      views: 205678,
      answers: [{}, {}, {}, {}, {}],
      createdAt: new Date("2021-09-01T00:00:00.000Z"),
    },
    {
      _id: "2",
      title: "Destructuring in React",
      tags: [
        { _id: "1", name: "React" },
        { _id: "2", name: "ReactDOM" },
      ],
      author: {
        _id: "a2",
        name: "Brad Traversy",
        picture: "https://example.com/bradtraversy.jpg",
      },
      upvotes: 1034567,
      views: 2012432,
      answers: [{}, {}, {}, {}, {}],
      createdAt: new Date("2021-09-01T00:00:00.000Z"),
    },
  ];


  const results = await GetQuestions({})

  console.log(results?.questions)

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[64px] rounded-[8px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

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
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-3">
        {(results?.questions ?? []).length > 0 ? (
          results?.questions.map((question) => (
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

export default Home;
