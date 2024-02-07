import workingHourRepository from "../repository/workingHour.repository";

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
