import { z } from "zod";
import {
  storeHolidayInputSchema,
  createHoliday,
  getAllHoliday,
  getHolidayById,
  updateHoliday,
} from "../services/holiday.service";
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
  const holidays = await getAllHoliday();
  return responseOk(res, 200, holidays);
});

const show = asyncHandler(async (req, res, next) => {
  const requestParams = z
    .number({ coerce: true })
    .positive()
    .safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const isHolidayExist = await getHolidayById(requestParams.data);
  if (!isHolidayExist) {
    return responseNotFounds(res, "Holiday not found");
  }

  return responseOk(res, 200, isHolidayExist);
});

const store = asyncHandler(async (req, res, next) => {
  req.body.date = new Date(req.body.date);
  const requestData = storeHolidayInputSchema.safeParse(req.body);

  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }

  const isHolidayAlreadyExist = await getAllHoliday({
    where: {
      date: requestData.data.date,
    },
  });
  if (isHolidayAlreadyExist.length > 0)
    responseConflict(res, "Holiday Already Exists");

  const holidays = await sequelize.transaction(async (transaction) =>
    createHoliday(requestData.data)
  );
  if (holidays) {
    return responseOk(res, 201, holidays);
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
  const isHolidayExist = await getHolidayById(requestParams.data);
  if (!isHolidayExist) {
    return responseNotFounds(res, "Holiday not found");
  }
  req.body.date = new Date(req.body.date);
  const requestData = storeHolidayInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }
  const isHolidayAlreadyExist = await getAllHoliday({
    where: {
      id: {
        [Op.not]: requestParams.data,
      },
      date: requestData.data.date,
    },
  });
  if (isHolidayAlreadyExist.length > 0)
    responseConflict(res, "Working Hour Already Exists");

  const updatedHoliday = await sequelize.transaction(async (transaction) =>
    updateHoliday(requestData.data, {
      transaction,
      where: {
        id: requestParams.data,
      },
    })
  );

  return responseOk(res, 200, updatedHoliday);
});

export default { index, store, show, updateOne };
