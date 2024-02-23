import { z } from "zod";
import accountRepository from "../repository/account.repository";
import { AccountAttributes } from "../models/Admin";
import { CreateOptions } from "sequelize";
import jwt from 'jsonwebtoken';

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

const jwtSign = jwt.sign;

export const login = async (username:string, password:string) => {
  try {
    const account = await accountRepository.findByUsername(username);
    console.log("🚀 ~ login ~ account:", account)
    if (!account) {
      throw new Error("Incorrect username");
    }
    if (account?.password !== password) {
      throw new Error("Incorrect password");
    }
    const token = await jwtSign({username: account.username}, "very_strong_key", {expiresIn: "48h"});
    const response = {account: account, token: token};
    return response;
  } catch (error) {
    throw error
  }
}

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
