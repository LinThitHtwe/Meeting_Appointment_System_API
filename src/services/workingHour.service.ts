import { CreateOptions } from "sequelize";
import workingHourRepository from "../repository/workingHour.repository";
import { WorkingHoursAttributes } from "../models/WorkingHours";

export const getAllWorkingHour = async () => {
  try {
    const workingHour = await workingHourRepository.findAll();
    return workingHour;
  } catch (error) {
    throw error;
  }
};

export const getWorkingHourById = async (id: number) => {
  try {
    const workingHour = await workingHourRepository.findByPk(id);
    return workingHour;
  } catch (error) {
    throw error;
  }
};

export const updateWorkingHour = async (
  data: {
    startTime: Date;
    endTime: Date;
  },
  options?: CreateOptions<WorkingHoursAttributes> | any
) => {
  try {
    const updatedWorkingHour = await workingHourRepository.update(
      data,
      options
    );
    return updatedWorkingHour;
  } catch (error) {
    throw error;
  }
};
