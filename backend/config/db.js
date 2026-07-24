import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Database Name:", conn.connection.name);
    console.log("Database Host:", conn.connection.host);

    console.log("✅ MongoDB Connected.....");
    console.log(conn.connection.host);
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;