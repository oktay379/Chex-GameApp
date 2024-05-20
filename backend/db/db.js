import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.mongoDB);
        console.log("mongoDB connect...")
    } catch (error) {
        console.log("Error Connecting mongoDB", error)
    }
}


export default connectMongo;