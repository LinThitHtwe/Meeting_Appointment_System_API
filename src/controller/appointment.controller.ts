import { NextFunction, Request, Response } from "express";
import {
  asyncHandler,
  responseNotFounds,
  responseOk,
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
} from "../services/appointment.service";

const getAll = asyncHandler(async (req, res, next) => {
  const appointments = await getAllAppointments();
  return responseOk(res, 200, appointments);
});

const store = asyncHandler(async (req, res, next) => {
  const requestData = storeAppointmentInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }
  const appointment = await sequelize.transaction(async (transaction) =>
    createAppointment(requestData.data, { transaction })
  );

  return responseOk(res, 201, appointment);
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

const updateOne = asyncHandler(async (req, res, next) => {
  const requestParams = z.number({ coerce: true }).positive().safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const isAppointmentExist = await getAppointmentById(requestParams.data);
  if (!isAppointmentExist) {
    return responseNotFounds(res, "Appointment not found");
  }
  const requestData = storeAppointmentInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
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
};
