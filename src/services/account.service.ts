import { z } from "zod";
import accountRepository from "../repository/account.repository";
import { AccountAttributes } from "../models/Account";
import { CreateOptions } from "sequelize";

export const storeAccountInputSchema = z.object({
  name: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Name cannot be blank or contain only whitespace",
    }),
  departmentId: z.number(),
  staffId: z.number(),
});

export const getAllAccounts = async () => {
  try {
    const accounts = await accountRepository.findAll();
    return accounts;
  } catch (error) {
    return error;
  }
};

export const getAccountById = async (id: number) => {
  try {
    const account = await accountRepository.findByPk(id);
    return account;
  } catch (error) {
    return error;
  }
};

export const createAccount = async (
  input: z.infer<typeof storeAccountInputSchema>,
  options?: CreateOptions<AccountAttributes>
) => {
  try {
    const newAccount = await accountRepository.create(
      {
        departmentId: input.departmentId,
        name: input.name,
        staffId: input.staffId,
      },
      options
    );
  } catch (error) {
    return error;
  }
};
