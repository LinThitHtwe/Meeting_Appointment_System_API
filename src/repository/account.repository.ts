import { CreateOptions, FindOptions, Identifier } from "sequelize";
import Account, { AccountAttributes } from "../models/Account";

type createAccount = {
  name: string;
  staffId: number;
  departmentId: number;
};

const findAll = (options?: FindOptions<AccountAttributes>) =>
  Account.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<AccountAttributes>
) => Account.findByPk(identifier, options);

const create = (
  data: createAccount,
  options?: CreateOptions<AccountAttributes>
) => Account.create(data, options);

const update = (
  id: number,
  data: { name?: string; staffId?: number; departmentId?: number },
  options?: CreateOptions<AccountAttributes>
) =>
  Account.update(data, {
    where: { id: id },
    returning: true,
    individualHooks: true,
    ...options,
  });

export default { findAll, findByPk, create, update };
