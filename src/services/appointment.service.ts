import { CreateOptions, FindOptions } from "sequelize";
import appointmentRepository from "../repository/appointment.repository";
import Appointment, { AppointmentAttributes } from "../models/Appointment";
import { z } from "zod";
import bcrypt from "bcrypt";
import Department from "../models/Department";
import Room from "../models/Room";

export const storeAppointmentInputSchema = z.object({
  date: z.date().refine((data) => !isNaN(data.getTime()), {
    message: "Date must be a valid date",
  }),
  startTime: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Start time cannot be blank or contain only whitespace",
    }),
  endTime: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Start time cannot be blank or contain only whitespace",
    }),
  departmentId: z.number(),
  description: z.string(),
  roomId: z.number(),
  staffId: z.number(),
  code: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Code cannot be blank or contain only whitespace",
    }),
});

export const getAllAppointments = async (options?: FindOptions<AppointmentAttributes> | any) => {
  try {
    const appointments = await appointmentRepository.findAll({
      include: [
        { model: Department, attributes: ["id", "name", "description"] },
        { model: Room, attributes: ["id", "name", "description"] },
      ],
      ...options,
    });
    return appointments;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentCount = async (options?: FindOptions<AppointmentAttributes> | any) => {
  try {
    const appointmentsCount = await appointmentRepository.findCount({
      include: [
        { model: Appointment },
      ], ...options
    })

    return appointmentsCount;
  } catch (error) {
    throw error;
  }
}

export const getAppointmentById = async (id: number) => {
  try {
    const appointment = await appointmentRepository.findByPk(id, {
      include: [
        { model: Department, attributes: ["id", "name", "description"] },
        { model: Room, attributes: ["id", "name", "description"] },
      ],
    });
    return appointment;
  } catch (error) {
    throw error;
  }
};
export const getAppointmentByRoomId = async (roomId: number) => {
  try {
    const appointment = await appointmentRepository.findByRoomId(roomId);
    return appointment;
  } catch (error) {
    throw error;
  }
};
export const createAppointment = async (
  input: z.infer<typeof storeAppointmentInputSchema>,
  options?: CreateOptions<AppointmentAttributes>
) => {
  try {
    const bcryptCode = await bcrypt.hash(input.code, 12);

    const newAppointment = await appointmentRepository.create(
      { ...input, code: bcryptCode },
      options
    );
    return newAppointment;
  } catch (error) {
    console.log('errrorr----', error)
    throw error;
  }
};

export const updateAppointment = async (
  input: z.infer<typeof storeAppointmentInputSchema>,
  options?: CreateOptions<AppointmentAttributes> | any
) => {
  try {
    const bcryptCode = await bcrypt.hash(input.code, 12);
    const updatedAppointment = appointmentRepository.update(
      { ...input, code: bcryptCode },
      options
    );
    return updatedAppointment;
  } catch (error) {
    throw error;
  }
};
