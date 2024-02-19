import { CreateOptions, FindOptions } from "sequelize";
import { z } from "zod";
import { WorkingHourType } from "./../../type";
import workingHourRepository from "../repository/workingHour.repository";
import { WorkingHoursAttributes } from "../models/WorkingHours";

const timeFormatRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
export const storeWorkingHourInputSchema = z.object({
  startTime: z.string().refine((time) => timeFormatRegex.test(time)),
  endTime: z.string().refine((time) => timeFormatRegex.test(time)),
});

export const getAllWorkingHour = async (
  options?: FindOptions<WorkingHoursAttributes> | any
) => {
  try {
    const workingHours = await workingHourRepository.findAll(options);
    return workingHours;
  } catch (error) {
    throw error;
  }
};

export const createWorkingHour = async (data: WorkingHourType) => {
  try {
    const workingHour = await workingHourRepository.create(data);
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

export const deleteWorkingHour = async (id: number) => {
  try {
    const workingHour = await workingHourRepository.remove(id);
    return workingHour;
  } catch (error) {
    throw error;
  }
}

export const updateWorkingHour = async (
  data: {
    startTime: string;
    endTime: string;
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
