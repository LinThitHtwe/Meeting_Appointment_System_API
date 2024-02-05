import { FindOptions, Identifier } from "sequelize";
import Department, { DepartmentAttributes } from "../models/Department";

const findAll = (options?: FindOptions<DepartmentAttributes>) =>
  Department.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<DepartmentAttributes>
) => Department.findByPk(identifier, options);

export { findAll, findByPk };
