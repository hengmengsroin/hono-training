import { Hono } from "hono";
import { userService } from "../services/user.service.js";

const authRoute = new Hono();
authRoute.post("/login", async (c) => {
  const json = await c.req.json();
  const { username, password } = json;
  const result = await userService.login(username, password);
  return c.json({ message: "Login route", result });
});

export { authRoute };
