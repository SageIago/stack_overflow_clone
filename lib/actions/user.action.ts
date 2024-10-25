/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import User from "@/database/user.model";
import { ConnectToDatabase } from "../mongoose";

export async function getUserById(params: any) {
    try {
        ConnectToDatabase();

        const { userId } = params;

        const user = await User.findOne({clerkId: userId});

        return user
    } catch (error) {
        console.log(error);
        throw new Error("An error occurred while trying to get the user");
    }
}