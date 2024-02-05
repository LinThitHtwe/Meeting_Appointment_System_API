import { CreateOptions, FindOptions, Identifier } from "sequelize";
import Department, { DepartmentAttributes } from "../models/Department";

const findAll = (options?: FindOptions<DepartmentAttributes>) =>
  Department.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<DepartmentAttributes>
) => Department.findByPk(identifier, options);

const create = (
  data: { name: string },
  options?: CreateOptions<DepartmentAttributes>
) => Department.create(data);

//const update = (data : {})=>Department.update()

export default { findAll, findByPk, create };
