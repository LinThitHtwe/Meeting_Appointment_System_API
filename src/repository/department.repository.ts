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
) => Department.create(data, options);

const update = (
  id: number,
  data: { name: string },
  options?: CreateOptions<DepartmentAttributes>
) =>
  Department.update(data, {
    where: { id: id },
    returning: true,
    individualHooks: true,
    ...options,
  });

export default { findAll, findByPk, create, update };
