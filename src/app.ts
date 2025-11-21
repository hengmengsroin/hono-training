import { Hono } from "hono";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { todoRoute } from "./routes/todo.route.js";
import { userRoute } from "./routes/user.route.js";
import { authRoute } from "./routes/auth.route.js";

const app = new Hono();
app.use("*", logger());
app.use("*", requestId());
app.get("/test", (c) => {
  const requestId = c.var.requestId;
  return c.json({ message: "Hello test!", requestId: requestId });
});
app.route("/auth", authRoute);
app.route("/users", userRoute);
app.route("/todos", todoRoute);

export { app };
