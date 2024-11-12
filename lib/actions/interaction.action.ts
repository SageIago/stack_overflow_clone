"use server";

import Question from "@/database/question.model";
import { ConnectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function ViewQuestion(params: ViewQuestionParams) {
  try {
    // First of all Connect to the Database
    await ConnectToDatabase();

    // Desctructure the Params Received
    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        return console.log("Already Viewed");
      }

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      })
    }
  } catch (error) {
    console.log(error);
  }
}
