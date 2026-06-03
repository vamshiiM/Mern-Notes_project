import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URL)

        console.log("MongoDb connected");

    } catch (error) {
        console.log("Error in mongodb connection", error);
    }
}