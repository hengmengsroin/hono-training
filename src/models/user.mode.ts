import { zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  permissions: z.array(z.string()).optional(),
  role: z.enum(["admin", "user"]),
  password: z.string().min(6).max(100),
});
type User = z.infer<typeof userSchema>;

const schema = zodSchema(userSchema);
const userModel = model("User", schema);

export { type User, userSchema, userModel };
