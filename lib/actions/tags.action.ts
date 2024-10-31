"use server"

import User from "@/database/user.model";
import { ConnectToDatabase } from "../mongoose"
import { GetTopInteractedTagsParams } from "./shared.types";

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