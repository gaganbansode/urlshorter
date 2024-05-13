import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODBURL}`);
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;