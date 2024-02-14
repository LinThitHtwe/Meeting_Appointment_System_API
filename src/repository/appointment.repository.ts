import { CreateOptions, FindOptions, Identifier, col, fn } from "sequelize";
import Appointment, { AppointmentAttributes } from "../models/Appointment";

type createAppointment = {
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
  roomId: number;
  staffId: number;
  departmentId: number;
  code: string;
};

type updateAppointment = {
  date?: Date;
  startTime?: string;
  endTime?: string;
  description?: string;
  accountId?: number;
  roomId?: number;
  staffId?: number;
  code: string;
};

const findAll = (options?: FindOptions<AppointmentAttributes>) => Appointment.findAll(options);

const findByPk = (identifier: Identifier, options?: FindOptions<AppointmentAttributes>) =>
  Appointment.findByPk(identifier, options);

const findCount = (options: FindOptions<AppointmentAttributes>) =>
  Appointment.findAll(options);

const findByRoomId = (roomId: number, options?: FindOptions<AppointmentAttributes>) =>
  Appointment.findAll({ where: { roomId }, ...options });

const create = (data: createAppointment, options?: CreateOptions<AppointmentAttributes>) =>
  Appointment.create(data, options);

const update = (data: updateAppointment, options?: CreateOptions<AppointmentAttributes> | any) =>
  Appointment.update(data, {
    where: options?.where || {},
    returning: true,
    individualHooks: true,
    ...options,
  });

export default { findAll, findCount, findByPk, create, update, findByRoomId };
