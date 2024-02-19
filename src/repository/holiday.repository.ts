import { CreateOptions, FindOptions, Identifier } from "sequelize";
import Holiday, { HolidayAttributes } from "../models/Holiday";

const findAll = (options?: FindOptions<HolidayAttributes>) =>
  Holiday.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<HolidayAttributes>
) => Holiday.findByPk(identifier, options);

const create = (
  data: { date: Date },
  options?: CreateOptions<HolidayAttributes>
) => Holiday.create(data, options);

const update = (
  data: { date: Date },
  options?: CreateOptions<HolidayAttributes> | any
) =>
  Holiday.update(data, {
    where: options?.where || {},
    returning: true,
    individualHooks: true,
    ...options,
  });

const remove = (id: number) =>
  Holiday.destroy({
    where: {
      id: id,
    },
  });

export default { findAll, findByPk, create, update, remove };
