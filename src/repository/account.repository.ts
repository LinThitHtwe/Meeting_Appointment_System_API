import { FindOptions, Identifier } from "sequelize";
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

const create = (data: createAccount) => Account.create(data);

export default { findAll, findByPk, create };
