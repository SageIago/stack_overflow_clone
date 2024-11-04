/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import Question from "@/database/question.model";
import { ConnectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswerParams } from "./shared.types";
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
      .populate("author", "_id, clerkId, name, picture")
      .sort({ createdAt: -1 });

    return { Answers };
  } catch (error) {
    console.log(error);
  }
}
