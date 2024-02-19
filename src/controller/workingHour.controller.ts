import { WorkingHourType } from "../../type";
import { z } from "zod";
import {
  storeWorkingHourInputSchema,
  createWorkingHour,
  getAllWorkingHour,
  getWorkingHourById,
  updateWorkingHour,
  deleteWorkingHour,
} from "../services/workingHour.service";
import {
  asyncHandler,
  responseConflict,
  responseNotFounds,
  responseOk,
  responseUnprocessableEntity,
} from "../utils/response_handler";
import { sequelize } from "../../config/db";
import { Op } from "sequelize";

const index = asyncHandler(async (req, res, next) => {
  const workingHours = await getAllWorkingHour();
  return responseOk(res, 200, workingHours);
});

const show = asyncHandler(async (req, res, next) => {
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

  return responseOk(res, 200, isWorkingHourExist);
});

const store = asyncHandler(async (req, res, next) => {
  const requestData = storeWorkingHourInputSchema.safeParse(req.body);

  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }

  const isWorkingHourAlreadyExist = await getAllWorkingHour({
    where: {
      startTime: requestData.data.startTime,
      endTime: requestData.data.endTime,
    },
  });
  if (isWorkingHourAlreadyExist.length > 0)
    responseConflict(res, "Working Hour Already Exists");

  const workingHours = await sequelize.transaction(async (transaction) =>
    createWorkingHour(requestData.data)
  );
  if (workingHours) {
    return responseOk(res, 201, workingHours);
  }
});

const deleteOne = asyncHandler(async (req, res, next) => {
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

  const workingHours = await sequelize.transaction(async (transaction) =>
    deleteWorkingHour(requestParams.data)
  );
  if (workingHours) {
    return responseOk(res, 200, workingHours);
  }
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
  const isWorkingHourAlreadyExist = await getAllWorkingHour({
    where: {
      id: {
        [Op.not]: requestParams.data,
      },
      startTime: requestData.data.startTime,
      endTime: requestData.data.endTime,
    },
  });
  if (isWorkingHourAlreadyExist.length > 0)
    responseConflict(res, "Working Hour Already Exists");

  const updatedWorkingHour = await sequelize.transaction(async (transaction) =>
    updateWorkingHour(requestData.data, {
      transaction,
      where: {
        id: requestParams.data,
      },
    })
  );

  return responseOk(res, 200, updatedWorkingHour);
});

export default { index, store, show, updateOne, deleteOne };
