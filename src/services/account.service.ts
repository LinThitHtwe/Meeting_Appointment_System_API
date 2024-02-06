import { z } from "zod";
import accountRepository from "../repository/account.repository";
import { AccountAttributes } from "../models/Admin";
import { CreateOptions } from "sequelize";

export const storeAccountInputSchema = z.object({
  username: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Name cannot be blank or contain only whitespace",
    }),
  password: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Password cannot be blank or contain only whitespace",
    }),
});

export const getAllAccounts = async () => {
  try {
    const accounts = await accountRepository.findAll();
    return accounts;
  } catch (error) {
    throw error;
  }
};

export const getAccountById = async (id: number) => {
  try {
    const account = await accountRepository.findByPk(id);
    return account;
  } catch (error) {
    throw error;
  }
};

export const createAccount = async (
  input: z.infer<typeof storeAccountInputSchema>,
  options?: CreateOptions<AccountAttributes>
) => {
  try {
    const newAccount = await accountRepository.create(
      {
        password: input.password,
        username: input.username,
      },
      options
    );
    return newAccount;
  } catch (error) {
    throw error;
  }
};

export const updateAccount = async (
  input: z.infer<typeof storeAccountInputSchema>,
  options?: CreateOptions<AccountAttributes> | any
) => {
  try {
    const updatedAccount = accountRepository.update(
      {
        password: input?.password,
        username: input?.username,
      },
      options
    );
    return updatedAccount;
  } catch (error) {
    throw error;
  }
};
