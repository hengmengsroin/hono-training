import { Hono } from "hono";
import { userService } from "../services/user.service.js";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { auth } from "../middlewares/auth.middleware.js";

const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(30),
  password: z.string().min(6).max(100),
});

const getUsersSchema = z.object({
  role: z.enum(["admin", "user"]),
});

const userRoute = new Hono();

userRoute.post("/", zValidator("json", createUserSchema), async (c) => {
  const body = await c.req.valid("json");
  const newUser = await userService.createUser(body);
  return c.json({ message: "User created", data: newUser }, 201);
});

userRoute.get(
  "/",
  auth(["admin"]),
  zValidator("query", getUsersSchema),
  async (c) => {
    const query = await c.req.valid("query");
    const user = c.get("user");
    console.log({ user });
    const role = query.role;
    const users = await userService.getUsers(role);
    return c.json({ message: "Users fetched", data: users, query });
  }
);

userRoute.get("/:id", async (c) => {
  const user = await userService.getOne(c.req.param("id"));
  return c.json({ message: "Users fetched", data: user });
});
export { userRoute };
