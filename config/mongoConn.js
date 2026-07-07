import mongoose from "mongoose";
import db from "./db.js";

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(db.MONGODB_URL, {
      dbName: db.MONGODB_DATABASE,
    });

    console.log("MongoDB connected successfully");
    console.log(`Database: ${connection.connection.name}`);
    console.log(`Host: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
}

export { connectToDatabase };
export default mongoose;