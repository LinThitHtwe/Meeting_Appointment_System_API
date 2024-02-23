import { CreateOptions, FindOptions, Identifier } from "sequelize";
import WorkingHours, { WorkingHoursAttributes } from "../models/WorkingHours";
import { WorkingHourType } from "../../type";

const findAll = (options?: FindOptions<WorkingHoursAttributes>) =>
  WorkingHours.findAll(options);

const create = (
  data: WorkingHourType,
  options?: CreateOptions<WorkingHoursAttributes>
) => {
  return WorkingHours.create(data, options);
};

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<WorkingHoursAttributes>
) => WorkingHours.findByPk(identifier, options);

const update = (
  data: { startTime?: string; endTime?: string; isActive?: boolean },
  options?: CreateOptions<WorkingHoursAttributes> | any
) =>
  WorkingHours.update(data, {
    where: options?.where || {},
    returning: true,
    individualHooks: true,
    ...options,
  });

  const remove = (id:number) => {
    return WorkingHours.destroy({
      where: {
        id,
      },
    });
  }

export default { findAll, findByPk, create, update, remove };
