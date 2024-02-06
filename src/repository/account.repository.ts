// import { CreateOptions, FindOptions, Identifier } from "sequelize";
// import Account, { AccountAttributes } from "../models/Admin";

// type createAccount = {
//   name: string;
//   staffId: number;
//   departmentId: number;
// };

// const findAll = (options?: FindOptions<AccountAttributes>) =>
//   Account.findAll(options);

// const findByPk = (
//   identifier: Identifier,
//   options?: FindOptions<AccountAttributes>
// ) => Account.findByPk(identifier, options);

// const create = (
//   data: createAccount,
//   options?: CreateOptions<AccountAttributes>
// ) => Account.create(data, options);

// const update = (
//   data: { name?: string; staffId?: number; departmentId?: number },
//   options?: CreateOptions<AccountAttributes> | any
// ) =>
//   Account.update(data, {
//     where: options?.where || {},
//     returning: true,
//     individualHooks: true,
//     ...options,
//   });

// export default { findAll, findByPk, create, update };
