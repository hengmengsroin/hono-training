import { zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { z } from "zod";

const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean().optional(),
});
type Todo = z.infer<typeof todoSchema>;

const schema = zodSchema(todoSchema);
const todoModel = model("Todo", schema);

export { type Todo, todoSchema, todoModel };
