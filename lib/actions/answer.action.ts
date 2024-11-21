/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import Question from "@/database/question.model";
import { ConnectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  GetAnswerParams,
  GetUserStatsParams,
} from "./shared.types";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";

export async function CreateAnswer(params: CreateAnswerParams) {
  try {
    ConnectToDatabase();

    // Destructure the Params Received
    // eslint-disable-next-line no-unused-vars
    const { content, author, question, path } = params;

    const NewAnswer = await Answer.create({ content, author, question });

    // Add the answer to the questions array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: NewAnswer?._id },
    });

    //  TODO: Add interaction

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Answer has not been Created...");
  }
}

export async function GetAllAnswers(params: GetAnswerParams) {
  try {
    ConnectToDatabase();

    const { questionId } = params;

    const Answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId picture name")
      .sort({ createdAt: -1 });

    return { Answers };
  } catch (error) {
    console.log(error);
  }
}

export async function UpvoteAnswer(params: AnswerVoteParams) {
  try {
    ConnectToDatabase();

    const { answerId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: params.userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: params.userId },
        $push: { upvotes: params.userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: params.userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function DownvoteAnswer(params: AnswerVoteParams) {
  try {
    ConnectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: params.userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function GetUserAnswers(params: GetUserStatsParams) {
  try {
    ConnectToDatabase();

    const { userId } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    // Get the Questions
    const GetAllUserAnswers = await Question.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    return { totalAnswers, answers: GetAllUserAnswers };
  } catch (error) {
    console.log("Couldn't get the user answers");
  }
}
