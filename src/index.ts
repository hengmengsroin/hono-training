import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { connectDB } from "./models/index.js";
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    connectDB();
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
