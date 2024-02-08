import { z } from "zod";
import { WorkingHourType } from './../../type';
import workingHourRepository from "../repository/workingHour.repository";

export const storeWorkingHourInputSchema = z.object({
    startTime: z.string(),
    endTime: z.string()
});

export const getAllWorkingHour = async () => {
    try {
        const workingHour = await workingHourRepository.findAll();
        return workingHour;
    } catch (error) {
        throw error;
    }
}

export const createWorkingHour = async (data: WorkingHourType) => {
    try {
        const workingHour = await workingHourRepository.create(data);
        return workingHour;
    } catch (error) {
        throw error;
    }
}

export const getWorkingHourById = async (id: number) => {
  try {
    const workingHour = await workingHourRepository.findByPk(id);
    return workingHour;
  } catch (error) {
    throw error;
  }
};
