import { FindOptions, Identifier } from "sequelize";
import Account, { AccountAttributes } from "../models/Account";

const findAll = (options?: FindOptions<AccountAttributes>) =>
  Account.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<AccountAttributes>
) => Account.findByPk(identifier, options);

export { findAll, findByPk };
