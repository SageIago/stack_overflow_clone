import Link from "next/link";
import ChevronRight from "@/app/public/assets/icons/chevron-right.svg";
import Image from "next/image";
import RenderTags from "../RenderTags";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: "1",
      title: "How to create a custom hook in React?",
    },
    {
      _id: "2",
      title: "Cascading Sheets in SQL Alchemy",
    },
    {
      _id: "3",
      title:
        "Would it be appropriate to point out an error in another paper during a referee report?",
    },
    {
      _id: "4",
      title: "How can an airconditioning machine exist?",
    },
    {
      _id: "5",
      title: "What is an example of 3 numbers that do not make up a vector?",
    },
  ];

  const popularTags = [
    {
      _id: "1",
      name: "React",
      totalQuestions: 15,
    },
    {
      _id: "2",
      name: "Python",
      totalQuestions: 15,
    },
    {
      _id: "3",
      name: "JavaScript",
      totalQuestions: 5,
    },
    {
      _id: "4",
      name: "SQL",
      totalQuestions: 5,
    },
    {
      _id: "5",
      name: "Node.js",
      totalQuestions: 150,
    },
  ];
  return (
    <aside className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((questions) => (
            <Link
              href={`/questions/${questions._id}`}
              key={questions._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {questions.title}
              </p>

              <Image
                src={ChevronRight}
                alt="Chevron-Right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

          <div className="mt-4 flex flex-col gap-4">
            {popularTags.map((tags) => (
              <RenderTags
                key={tags._id}
                _id={tags._id}
                name={tags.name}
                totalQuestions={tags.totalQuestions}
                showCount
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
