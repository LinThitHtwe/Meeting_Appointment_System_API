import accountRepository from "../repository/account.repository";

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

export const createAccount = async (data: {
  name: string;
  staffId: number;
  departmentId: number;
}) => {
  try {
    const newAccount = await accountRepository.create(data);
  } catch (error) {
    return error;
  }
};
