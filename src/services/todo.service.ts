import { todoModel, type Todo } from "../models/todo.model.js";

class TodoService {
  async getTodos() {
    const todos = await todoModel.find();
    return todos;
  }

  async getOne(id: string) {
    const item = await todoModel.findOne({ id });
    return item;
  }

  async createTodo(todo: { title: string }) {
    const totalItems = await todoModel.countDocuments();
    const newTodo: Todo = {
      id: (totalItems + 1).toString(),
      title: todo.title,
      completed: false,
    };
    const createdTodo = await todoModel.create(newTodo);
    console.log({ createdTodo });

    return createdTodo;
  }

  async updateOne(id: string, todo: { title?: string; completed?: boolean }) {
    const existingItem = await todoModel.findOne({ id });
    if (!existingItem) {
      throw new Error("Todo not found");
    }
    if (todo.title) {
      existingItem.title = todo.title;
    }
    if (todo.completed !== undefined) {
      existingItem.completed = todo.completed;
    }
    await existingItem.save();
    return existingItem;
  }

  async deleteOne(id: string) {
    const deletedItem = await todoModel.findOneAndDelete({ id });
    return deletedItem;
  }
}

const todoService = new TodoService();
export { todoService };
