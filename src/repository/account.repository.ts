import { CreateOptions, FindOptions, Identifier } from "sequelize";
import Account, { AccountAttributes } from "../models/Admin";

type createAccount = {
  username: string;
  password: string;
};

const findAll = (options?: FindOptions<AccountAttributes>) =>
  Account.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<AccountAttributes>
) => Account.findByPk(identifier, options);

const findByUsername = (
  username: string,
  options?: FindOptions<AccountAttributes>
) => Account.findOne({where: {username}, ...options});

const create = (
  data: createAccount,
  options?: CreateOptions<AccountAttributes>
) => Account.create(data, options);

const update = (
  data: { username?: string; password?: string },
  options?: CreateOptions<AccountAttributes> | any
) =>
  Account.update(data, {
    where: options?.where || {},
    returning: true,
    individualHooks: true,
    ...options,
  });

export default { findAll, findByPk, findByUsername, create, update };
