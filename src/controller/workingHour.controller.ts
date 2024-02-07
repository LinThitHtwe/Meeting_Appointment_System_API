import { z } from "zod";
import {
  getAllWorkingHour,
  getWorkingHourById,
  updateWorkingHour,
} from "../services/workingHour.service";
import {
  asyncHandler,
  responseNotFounds,
  responseOk,
  responseUnprocessableEntity,
} from "../utils/response_handler";
import { sequelize } from "../../config/db";

const index = asyncHandler(async (req, res, next) => {
  const workingHours = await getAllWorkingHour();
  return responseOk(res, 200, workingHours);
});

const updateOne = asyncHandler(async (req, res, next) => {
  const requestParams = z
    .number({ coerce: true })
    .positive()
    .safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const isWorkingHourExist = await getWorkingHourById(requestParams.data);
  if (!isWorkingHourExist) {
    return responseNotFounds(res, "Working Hour not found");
  }

  const requestData = storeWorkingHourInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }

  const updatedWorkingHour = await sequelize.transaction(async (transaction) =>
    updateWorkingHour(requestData.data, {
      transaction,
      where: {
        id: requestParams.data,
      },
    })
  );
});

export default { index, updateOne };
