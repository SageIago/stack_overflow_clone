import { GetUserAnswers } from "@/lib/actions/answer.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../Cards/QuestionCard";


interface Props extends SearchParamsProps{
    userId: string;
    clerkId?: string | null;
}

export default async function AnswersTab ({userId, clerkId}: Props) {
    const result = await GetUserAnswers({userId});
    return (
        <>
            {result?.answers.map((question) => (
                 <QuestionCard
                 key={question._id}
                 _id={question._id}
                 clerkId={clerkId}
                 tags={question.tags}
                 title={question.title}
                 author={question.author}
                 upvotes={question.upvotes}
                 views={question.views}
                 answers={question.answers}
                 createdAt={question.createdAt}
               />
            ))}
        </>
    )
}