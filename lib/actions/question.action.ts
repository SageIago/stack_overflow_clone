/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import Question from "@/database/question.model";
import { ConnectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  GetQuestionParams,
  GetQuestionByIdParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function GetQuestions(params: GetQuestionParams) {
  try {
    // When fetching from the database, always connect first
    ConnectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 })

    return { questions };
  } catch (error) {
    console.log(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CreateQuestion(params: CreateQuestionParams) {
  // eslint-disable-next-line no-empty
  try {
    // This Function has to connect to the DB
    ConnectToDatabase();

    // Destructure the params

    const { title, content, tags, author, path} = params;

    // Create a new Question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // Checking if the tags are there, if it is , matches it, if it isnt creating a new tag and the question matching it.
    for (const tag of tags) {
      // Checking if the tag exists
      const existingTags = await Tag.findOneAndUpdate(
        // The first params allows us to find something(Filter)
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // the i flag makes it case-insensitive
        // The second paramters allows us to modify its contents(Update)
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        // The third parameter allows us to  provide additional options
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTags._id);

      await Question.findByIdAndUpdate(question._id, {
        $push: { tags: { $each: tagDocuments } },
      });

      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GetQuestionById(params: GetQuestionByIdParams) {
  try {
    ConnectToDatabase();

    const { questionId } = params;

    const specificQuestions = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

      return specificQuestions
  } catch (error) {
    console.log(error);
  }
}


export async function UpvoteQuestion(params: QuestionVoteParams) {
  try {
    ConnectToDatabase();

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {}

    if(hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if(hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });

    // Increment the Author's Karma

    if(!question) {
      throw new Error("Question not found") 
    }

    revalidatePath(path)

  } catch(error) {
    console.log(error)
  }
}


export async function DownVoteQuestion(params: QuestionVoteParams) {
  try {
    ConnectToDatabase();

    // Destructure the params
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {}

    if(hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if(hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, { new: true });


    if(!question) {
      throw new Error("Question not found")
    }
    revalidatePath(path)
  } catch (error) {
    console.log(error);
  }
}