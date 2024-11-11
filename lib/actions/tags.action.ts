"use server"

import User from "@/database/user.model";
import { ConnectToDatabase } from "../mongoose"
import { GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
    try {

        ConnectToDatabase();

        const { userId } = params

        const user = User.findById(userId);

        if(!user) {
            throw new Error("User not found")
        }

        return [ { _id: "1", name: "React" }, { _id: "2", name: "Node" } ]
    } catch(error) {
        console.log(error)
    }
}

export async function GetAllTags() {
    try {
        ConnectToDatabase();

        const tags = await Tag.find({})

        return { tags }
    } catch(error) {
        console.log(error)
    }
}

export async function GetQuestionsByTagId(params: GetQuestionsByTagIdParams) {
        try {
            ConnectToDatabase();
            const { tagId, searchQuery} = params;

            const TagFilter: FilterQuery<ITag> = { _id: tagId }

            const tag = await Tag.findOne(TagFilter).populate({
                path: "questions",
                model: Question,
                match: searchQuery ? { title: { $regex: new RegExp(searchQuery, "i") } } : {},
                populate: [
                    {
                        path: "tags", model: Tag, select: "_id name" 
                    },
                    {
                        path: "author", model: User, select: "_id clerkId name picture"
                    }
                ]
            })

            if(!tag) {
                throw new Error("Tag not found")
            }

            const Questions = tag.questions

            return { TagTitle: tag.name , Questions }

        } catch (error) {
            console.log(error)
        }
}