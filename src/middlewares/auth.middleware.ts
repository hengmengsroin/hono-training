import type { Context, MiddlewareHandler } from "hono";
import type { User } from "../models/user.mode.js";
import { userService } from "../services/user.service.js";
import { HTTPException } from "hono/http-exception";

export const auth =
  (
    roles: ("admin" | "user")[]
  ): MiddlewareHandler<{
    Variables: {
      user: User;
    };
  }> =>
  async (ctx: Context, next: () => Promise<unknown>): Promise<void> => {
    const jwt: string = ctx.req.header("Authorization")
      ? ctx.req.header("Authorization")!
      : "";
    if (jwt && jwt.includes("Bearer")) {
      const token = jwt.split(" ")[1];
      const userId = token == "training" ? "1" : null;
      if (userId) {
        const user = await userService.getOne(userId);
        if (user) {
          console.log({ user });
          if (roles.includes(user.role)) {
            // remove password from user object
            const newUser = {
              _id: user._id,
              name: user.name,
              id: user.id,
              username: user.username,
              role: user.role,
            };
            ctx.set("user", newUser);
          } else {
            throw new HTTPException(403, { message: "forbidden" });
          }
        }
      } else {
        throw new HTTPException(401, { message: "invalidAccessToken" });
      }
    } else {
      throw new HTTPException(401, { message: "accessTokenRequired" });
    }
    await next();
  };
