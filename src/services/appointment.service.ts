import { CreateOptions } from "sequelize";
import appointmentRepository from "../repository/appointment.repository";
import { AppointmentAttributes } from "../models/Appointment";
import { z } from "zod";

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
  description: z.string(),
  accountId: z.number(),
  roomId: z.number(),
});

export const getAllAppointments = async () => {
  try {
    const appointments = await appointmentRepository.findAll();
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
    const newAppointment = await appointmentRepository.create(
      { ...input },
      options
    );
    return newAppointment;
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (
  id: number,
  input: z.infer<typeof storeAppointmentInputSchema>,
  options?: CreateOptions<AppointmentAttributes>
) => {
  try {
    const updatedAppointment = appointmentRepository.update(
      id,
      { ...input },
      options
    );
    return updatedAppointment;
  } catch (error) {
    throw error;
  }
};
