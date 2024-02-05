import appointmentRepository from "../repository/appointment.repository";

type createAppointment = {
  date: string | object;
  startTime: string | object;
  endTime: string | object;
  description: string;
  accountId: number;
  roomId: number;
};

export const getAllAppointments = async () => {
  try {
    const appointments = await appointmentRepository.findAll();
    return appointments;
  } catch (error) {
    return error;
  }
};

export const getAppointmentById = async (id: number) => {
  try {
    const appointment = await appointmentRepository.findByPk(id);
    return appointment;
  } catch (error) {
    return error;
  }
};

export const createAppointment = async (data: createAppointment) => {
  try {
    const newAppointment = await appointmentRepository.create(data);
  } catch (error) {
    return error;
  }
};
