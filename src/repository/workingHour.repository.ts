import { CreateOptions, FindOptions } from "sequelize";
import WorkingHours, { WorkingHoursAttributes } from "../models/WorkingHours";
import { WorkingHourType } from "../../type";

const findAll = (options?: FindOptions<WorkingHoursAttributes>) => WorkingHours.findAll(options);

const create = (data: WorkingHourType, options?: CreateOptions<WorkingHoursAttributes>) => {
    return WorkingHours.create(data, options);
}

export default { findAll, create };