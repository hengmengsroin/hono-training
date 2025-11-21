import { HTTPException } from "hono/http-exception";
import passHelper from "../libs/pass.helper.js";
import { userModel, type User } from "../models/user.mode.js";

class UserService {
  async getUsers(role: "admin" | "user") {
    console.log(role);

    const Users = await userModel.find();
    return Users;
  }

  async getOne(id: string) {
    const item = await userModel.findOne({ id });
    return item;
  }

  async login(username: string, password: string) {
    const user = await userModel.findOne({ username });
    if (!user) {
      throw new HTTPException(404, {
        message: "User not found",
      });
    }
    const isPasswordValid = await passHelper.verifyPassword(
      password,
      user.password
    );

    return { user, isPasswordValid };
  }

  async createUser(user: { name: string; username: string; password: string }) {
    const totalItems = await userModel.countDocuments();
    const newUser: User = {
      id: (totalItems + 1).toString(),
      name: user.name,
      permissions: [],
      role: "user",
      username: user.username,
      password: await passHelper.hashPassword(user.password),
    };
    const createdUser = await userModel.create(newUser);
    console.log({ createdUser });
    return createdUser;
  }

  async updateOne(id: string, User: { title?: string; completed?: boolean }) {
    const existingItem = await userModel.findOne({ id });
    if (!existingItem) {
      throw new Error("User not found");
    }

    await existingItem.save();
    return existingItem;
  }

  async deleteOne(id: string) {
    const deletedItem = await userModel.findOneAndDelete({ id });
    return deletedItem;
  }
}

const userService = new UserService();
export { userService };
