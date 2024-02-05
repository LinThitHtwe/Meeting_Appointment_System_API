import { FindOptions, Identifier } from "sequelize";
import Appointment, { AppointmentAttributes } from "../models/Appointment";

const findAll = (options?: FindOptions<AppointmentAttributes>) =>
  Appointment.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<AppointmentAttributes>
) => Appointment.findByPk(identifier, options);

export { findAll, findByPk };
