import { Hono } from "hono";
import { todoService } from "../services/todo.service.js";
const todoRoute = new Hono();

todoRoute
  .get("/", async (c) => {
    const todos = await todoService.getTodos();
    return c.json({ message: "Todos fetched", data: todos });
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    const newTodo = await todoService.createTodo(body);
    return c.json({ message: "Todo created", data: newTodo }, 201);
  });

todoRoute
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const item = await todoService.getOne(id);
    return c.json({ message: "Todos fetched", data: item });
  })
  .patch("/:id", async (c) => {
    const body = await c.req.json();
    const id = c.req.param("id");
    const newTodo = await todoService.updateOne(id, body);
    return c.json({ message: "Todo created", data: newTodo }, 201);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const deletedItem = await todoService.deleteOne(id);
    return c.json({ message: "Todo deleted", data: deletedItem }, 200);
  });

export { todoRoute };
