/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import { ConnectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  GetUserStatsParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: any) {
  try {
    ConnectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while trying to get the user");
  }
}

export async function CreateUser(userData: CreateUserParams) {
  try {
    ConnectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function UpdateUser(params: UpdateUserParams) {
  try {
    ConnectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteUser(params: DeleteUserParams) {
  try {
    ConnectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User Not Found");
    }

    // Delete the user from the database, with all his comments, ids, and answers, comments, etc
    // const userQuestionIds = await Question.find({ author: user._id}).distinct("_id")

    // Delete All Questions
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers() {
  try {
    ConnectToDatabase();

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    ConnectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if(!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id }); 


    return {
      user,
      totalQuestions,
      totalAnswers
    }

  } catch (error) {
    console.log(error);
  }
}

export async function GetUserQuestions(params: GetUserStatsParams) {
  try {
    ConnectToDatabase();

    const { userId } = params;

    const TotalQuestions = await Question.countDocuments({ author: userId });

    // Get the Questions
    const GetAllUserQuestions = await Question.find({ author: userId }).sort({ views:-1, upvotes: -1 }).populate("tags", "_id name")
    .populate("author", "_id clerkId name picture")


    return { TotalQuestions, questions: GetAllUserQuestions };
  } catch (error) {
    console.log(error)
  }
}
