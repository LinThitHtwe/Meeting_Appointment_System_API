import { date, z } from "zod";
import {
  storeHolidayInputSchema,
  createHoliday,
  getAllHoliday,
  getHolidayById,
  updateHoliday,
  removeHoliday,
} from "../services/holiday.service";
import {
  asyncHandler,
  responseBadRequest,
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
  try {
    const newHolidays = req.body.data.newHolidays.map((date: string) => new Date(date));
    const removedHolidays = req.body.data.removedHolidays.map((date: string) => new Date(date));

    await Promise.all(newHolidays.map(async (date: Date) => {
      const isHolidayAlreadyExist = await getAllHoliday({
        where: {
          date: date,
        },
      });
      if (isHolidayAlreadyExist.length === 0) {
        await createHoliday(date);
      }
    }));

    await Promise.all(removedHolidays.map(async (date: Date) => {
      const isHolidayAlreadyExist = await getAllHoliday({
        where: {
          date: date,
        },
      });
      if (isHolidayAlreadyExist.length > 0) {
        console.log("isHolidayExist", isHolidayAlreadyExist);
        const holidayId = isHolidayAlreadyExist[0].id;
        if (holidayId !== undefined) {
          await removeHoliday(holidayId);
        }
      }
    }));

    return responseOk(res, 201, { message: "Holidays changes save successful." });
  } catch (error) {
    return responseBadRequest(res, "Save changes fail");
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

const remove = asyncHandler(async (req, res, next) => {
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

  const removedHoliday = await removeHoliday(requestParams.data);
  return responseOk(res, 200, removedHoliday);
});

export default { index, store, show, updateOne, remove };
