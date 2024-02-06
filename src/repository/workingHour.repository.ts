import { FindOptions } from "sequelize";
import WorkingHours, { WorkingHoursAttributes } from "../models/WorkingHours";

const findAll = (options?: FindOptions<WorkingHoursAttributes>) => WorkingHours.findAll(options);

export default { findAll };