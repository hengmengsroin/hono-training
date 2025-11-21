import { z } from "zod";
import "dotenv/config";
import { extendZod } from "@zodyac/zod-mongoose";
import mongoose from "mongoose";
extendZod(z);

function connectDB() {
  mongoose.connect(process.env.DB_URL as string);

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });
}

export { connectDB };
