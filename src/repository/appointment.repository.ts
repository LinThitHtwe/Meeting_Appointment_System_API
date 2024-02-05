import { FindOptions, Identifier } from "sequelize";
import Appointment, { AppointmentAttributes } from "../models/Appointment";

type createAppointment = {
  date: string | object;
  startTime: string | object;
  endTime: string | object;
  description: string;
  accountId: number;
  roomId: number;
};

const findAll = (options?: FindOptions<AppointmentAttributes>) =>
  Appointment.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<AppointmentAttributes>
) => Appointment.findByPk(identifier, options);

const create = (data: createAppointment) => Appointment.create(data);

export default { findAll, findByPk, create };
