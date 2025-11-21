import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
const passHelper = {
  hashPassword: async (password: string): Promise<string> => {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  },
  verifyPassword: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    const isMatch = compareSync(password, hashedPassword);
    return isMatch;
  },
};
export default passHelper;
