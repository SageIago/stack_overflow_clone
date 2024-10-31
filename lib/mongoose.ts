import mongoose from "mongoose"

let isConnected: boolean = false;

export const ConnectToDatabase = async ()=> {
    mongoose.set("strictQuery", true)

    if(!process.env.MONGODB_URL) {
        return console.log("MONGODB_URL is not defined in the .env file");
    }

    if(isConnected) {
        return console.log("Already connected to the MONGODB database");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "DevFlow",
        })

        isConnected = true;
        
        console.log("Connected to the MONGODB database");
    } catch(error) {
        console.log("Error connecting to the MONGODB database", error);
    }
}