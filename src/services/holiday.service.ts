import { CreateOptions, FindOptions } from "sequelize";
import { z } from "zod";
import holidayRepository from "../repository/holiday.repository";
import { HolidayAttributes } from "../models/Holiday";

export const storeHolidayInputSchema = z.object({
  date: z.date(),
});

export const getAllHoliday = async (
  options?: FindOptions<HolidayAttributes> | any
) => {
  try {
    const holiday = await holidayRepository.findAll(options);
    return holiday;
  } catch (error) {
    throw error;
  }
};

export const createHoliday = async (data: { date: Date }) => {
  try {
    const holiday = await holidayRepository.create(data);
    return holiday;
  } catch (error) {
    throw error;
  }
};

export const getHolidayById = async (id: number) => {
  try {
    const holiday = await holidayRepository.findByPk(id);
    return holiday;
  } catch (error) {
    throw error;
  }
};

export const updateHoliday = async (
  data: {
    date: Date;
  },
  options?: CreateOptions<HolidayAttributes> | any
) => {
  try {
    const updatedHoliday = await holidayRepository.update(data, options);
    return updatedHoliday;
  } catch (error) {
    throw error;
  }
};

export const removeHoliday = async (id: number) => {
  try {
    const removedHoliday = await holidayRepository.remove(id);
    return removedHoliday;
  } catch (error) {
    throw error;
  }
};
