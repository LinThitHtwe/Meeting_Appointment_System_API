import { NextFunction, Request, Response } from "express";
import {
  asyncHandler,
  responseBadRequest,
  responseConflict,
  responseNotFounds,
  responseOk,
  responseUnauthorized,
  responseUnprocessableEntity,
} from "../utils/response_handler";
import { sequelize } from "../../config/db";
import { z } from "zod";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  storeAppointmentInputSchema,
  updateAppointment,
  getAppointmentByRoomId,
} from "../services/appointment.service";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

const getAll = asyncHandler(async (req, res, next) => {
  const appointments = await getAllAppointments();
  return responseOk(res, 200, appointments);
});

const store = asyncHandler(async (req, res, next) => {
  try {
    req.body.date = new Date(req.body.date);
    if (req.body.date < new Date()) {
      return responseBadRequest(res, "Date cannot be lower than today date");
    }
    const requestData = storeAppointmentInputSchema.safeParse(req.body);
    if (!requestData.success) {
      return responseUnprocessableEntity(res, requestData.error);
    }

    const isAppointmentALreadyExist = await getAllAppointments({
      where: {
        roomId: requestData.data.roomId,
        date: requestData.data.date,
        [Op.or]: [
          {
            [Op.and]: [
              { startTime: { [Op.lte]: requestData.data.startTime } },
              { endTime: { [Op.gte]: requestData.data.endTime } },
            ],
          },
          {
            [Op.and]: [
              { startTime: { [Op.gte]: requestData.data.startTime } },
              { startTime: { [Op.lte]: requestData.data.endTime } },
            ],
          },
        ],
      },
    });
    if (isAppointmentALreadyExist.length > 0) {
      return responseConflict(res, "Appointment Already Exist");
    }
    const appointment = await sequelize.transaction(async (transaction) =>
      createAppointment(requestData.data, { transaction })
    );

    return responseOk(res, 201, appointment);
  } catch (error) {
    return next(error);
  }
});

const compareAppointmentCode = asyncHandler(async (req, res, next) => {
  const requestParams = z.number({ coerce: true }).positive().safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }

  const appointment = await getAppointmentById(requestParams.data);
  if (!appointment) {
    return responseNotFounds(res, "Appointment not found");
  }

  const requestData = z
    .object({
      code: z
        .string()
        .max(255)
        .refine((data) => data.trim() !== "", {
          message: "Code cannot be blank or contain only whitespace",
        }),
    })
    .safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }

  const match = await bcrypt.compare(requestData.data.code, appointment.code);
  if (!match) {
    return responseUnauthorized(res, "Unauthorized. Invalid Meeting Code");
  }

  return responseOk(res, 200, { success: true });
});

const getOne = asyncHandler(async (req, res, next) => {
  const requestParams = z.number({ coerce: true }).positive().safeParse(req.params.id);

  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }

  const appointment = await getAppointmentById(requestParams.data);
  if (!appointment) {
    return responseNotFounds(res, "Appointment not found");
  }

  return responseOk(res, 200, appointment);
});
const getAppointmentRoomId = asyncHandler(async (req, res, next) => {
  const requestParams = z.number({ coerce: true }).positive().safeParse(req.params.roomId);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const appointment = await getAppointmentByRoomId(requestParams.data);
  if (!appointment) {
    return responseNotFounds(res, "Appointment not found");
  }

  return responseOk(res, 200, appointment);
});
const updateOne = asyncHandler(async (req, res, next) => {
  const requestParams = z.number({ coerce: true }).positive().safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const isAppointmentExist = await getAppointmentById(requestParams.data);
  if (!isAppointmentExist) {
    return responseNotFounds(res, "Appointment not found");
  }
  req.body.date = new Date(req.body.date);
  if (req.body.date < new Date()) {
    return responseBadRequest(res, "Date cannot be lower than today date");
  }
  const requestData = storeAppointmentInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }

  const isAppointmentAlreadyExist = await getAllAppointments({
    where: {
      id: {
        [Op.not]: requestParams.data,
      },
      roomId: requestData.data.roomId,
      date: requestData.data.date,
      [Op.or]: [
        {
          [Op.and]: [
            { startTime: { [Op.lte]: requestData.data.startTime } },
            { endTime: { [Op.gte]: requestData.data.endTime } },
          ],
        },
        {
          [Op.and]: [
            { startTime: { [Op.gte]: requestData.data.startTime } },
            { startTime: { [Op.lte]: requestData.data.endTime } },
          ],
        },
      ],
    },
  });

  console.log("isAppointmentALreadyExist---", isAppointmentAlreadyExist);
  if (isAppointmentAlreadyExist.length > 0) {
    return responseConflict(res, "Appointment Already Exist");
  }

  const appointment = await sequelize.transaction(async (transaction) =>
    updateAppointment(requestData.data, {
      transaction,
      where: {
        id: requestParams.data,
      },
    })
  );

  return responseOk(res, 200, appointment);
});

export default {
  getAll,
  store,
  getOne,
  updateOne,
  compareAppointmentCode,
  getAppointmentRoomId,
};
