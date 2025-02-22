import mongoose from "mongoose";

export default async function connectMongoDB() {
    if (!process.env.MONGODB_URI) return console.log("[DB] No MongoDB URI found.");
    await mongoose.connect(process.env.MONGODB_URI);
    return mongoose;
}

mongoose.connection.on("connected", () => {
    console.log("[DB] Connected to MongoDB.");
});