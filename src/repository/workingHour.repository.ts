import { FindOptions, Identifier } from "sequelize";
import WorkingHours, { WorkingHoursAttributes } from "../models/WorkingHours";

const findAll = (options?: FindOptions<WorkingHoursAttributes>) =>
  WorkingHours.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<WorkingHoursAttributes>
) => WorkingHours.findByPk(identifier, options);

export default { findAll, findByPk };
