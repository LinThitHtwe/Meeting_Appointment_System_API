import { CreateOptions, FindOptions, Identifier } from "sequelize";
import WorkingHours, { WorkingHoursAttributes } from "../models/WorkingHours";

const findAll = (options?: FindOptions<WorkingHoursAttributes>) =>
  WorkingHours.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<WorkingHoursAttributes>
) => WorkingHours.findByPk(identifier, options);

const update = (
  data: { startTime?: Date; endTime?: Date },
  options?: CreateOptions<WorkingHoursAttributes> | any
) =>
  WorkingHours.update(data, {
    where: options?.where || {},
    returning: true,
    individualHooks: true,
    ...options,
  });

export default { findAll, findByPk, update };
