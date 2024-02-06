import { CreateOptions, FindOptions, Identifier } from "sequelize";
import Appointment, { AppointmentAttributes } from "../models/Appointment";

type createAppointment = {
  date: string | object;
  startTime: string | object;
  endTime: string | object;
  description: string;
  accountId: number;
  roomId: number;
  staffId: number;
};

type updateAppointment = {
  date?: string | object;
  startTime?: string | object;
  endTime?: string | object;
  description?: string;
  accountId?: number;
  roomId?: number;
};

const findAll = (options?: FindOptions<AppointmentAttributes>) =>
  Appointment.findAll(options);

const findByPk = (
  identifier: Identifier,
  options?: FindOptions<AppointmentAttributes>
) => Appointment.findByPk(identifier, options);

const create = (
  data: createAppointment,
  options?: CreateOptions<AppointmentAttributes>
) => Appointment.create(data, options);

const update = (
  data: updateAppointment,
  options?: CreateOptions<AppointmentAttributes> | any
) =>
  Appointment.update(data, {
    where: options?.where || {},
    returning: true,
    individualHooks: true,
    ...options,
  });

export default { findAll, findByPk, create, update };
