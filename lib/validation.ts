import * as z from "zod";

export const QuestionsSchema = z.object({
    title: z.string().min(5, {message: "Title must be at least five characters"}).max(130, {message: "Title must be less than 130 characters"}),
    explanation: z.string().min(100, {message: "Explanation of the Problem must bre greater than 100 characters"}).max(1000, {message: "Explanation of the Problem must be less than 1000 characters"}),
    tags: z.array(z.string().min(1).max(15)).min(1, {message: "Tags must not be empty"}).max(3, {message: "You can only add up to Three tags"}),
  })

export const AnswerSchema = z.object({
  answer: z.string().max(1000)
})