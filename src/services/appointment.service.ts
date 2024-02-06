import { CreateOptions } from "sequelize";
import appointmentRepository from "../repository/appointment.repository";
import { AppointmentAttributes } from "../models/Appointment";
import { z } from "zod";
import Department from "../models/Department";
import Room from "../models/Room";

export const storeAppointmentInputSchema = z.object({
  date: z
    .string()
    .max(255)
    .refine((data) => data.trim() !== "", {
      message: "Date cannot be blank or contain only whitespace",
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
      message: "End time cannot be blank or contain only whitespace",
    }),
  departmentId: z.number(),
  description: z.string(),
  roomId: z.number(),
  staffId: z.number(),
});

export const getAllAppointments = async () => {
  try {
    const appointments = await appointmentRepository.findAll({
      include: [
        { model: Department, attributes: ["id", "name", "description"] },
        { model: Room, attributes: ["id", "name", "description"] },
      ],
    });
    return appointments;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentById = async (id: number) => {
  try {
    const appointment = await appointmentRepository.findByPk(id);
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
    const newAppointment = await appointmentRepository.create({ ...input }, options);
    return newAppointment;
  } catch (error) {
    throw error;
  }
};

export const updateAppointment = async (
  input: z.infer<typeof storeAppointmentInputSchema>,
  options?: CreateOptions<AppointmentAttributes> | any
) => {
  try {
    const updatedAppointment = appointmentRepository.update({ ...input }, options);
    return updatedAppointment;
  } catch (error) {
    throw error;
  }
};
