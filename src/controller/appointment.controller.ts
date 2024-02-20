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
  getAppointmentCount,
  updateAppointmentInputSchema,
} from "../services/appointment.service";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import Room from "../models/Room";
import Department from "../models/Department";
import { getAllHoliday } from "../services/holiday.service";

const getAll = asyncHandler(async (req, res, next) => {
  const appointments = await getAllAppointments();
  return responseOk(res, 200, appointments);
});

const getCount = asyncHandler(async (req, res, next) => {
  const roomCount = await getAppointmentCount({
    attributes: [
      [sequelize.literal('"room"."name"'), "roomName"],
      [sequelize.fn("count", sequelize.col("room_id")), "roomCount"],
    ],
    include: [
      {
        model: Room,
        attributes: [],
      },
      {
        model: Department,
        attributes: [],
      },
    ],
    group: ["room.id", "roomName"],
  });

  const departmentCount = await getAppointmentCount({
    attributes: [
      [sequelize.literal('"department"."name"'), "departmentName"],
      [sequelize.fn("count", sequelize.col("department_id")), "departmentCount"],
    ],
    include: [
      {
        model: Department,
        attributes: [],
      },
    ],
    group: ["department.id", "departmentName"],
  });

  return responseOk(res, 200, { roomCount, departmentCount });
});

const store = asyncHandler(async (req, res, next) => {
  try {
    req.body.date = new Date(req.body.date);
    if (req.body.date < new Date()) {
      return responseBadRequest(res, "Date cannot be lower than today date");
    }
    const isHolidayAlreadyExist = await getAllHoliday({
      where: {
        date: req.body.date,
      },
    });
    if (isHolidayAlreadyExist.length > 0) {
      responseConflict(res, "Cannot Schedule an Appointment on Holidays");
    }
    const departmentToNumber = parseInt(req.body.departmentId, 10);
    const roomToNumber = parseInt(req.body.roomId, 10);
    const staffToNumber = parseInt(req.body.staffId, 10);
    const data = {
      ...req.body,
      departmentId: departmentToNumber,
      roomId: roomToNumber,
      staffId: staffToNumber,
    };
    const requestData = storeAppointmentInputSchema.safeParse(data);
    if (!requestData.success) {
      return responseUnprocessableEntity(res, requestData.error);
    }

    const isAppointmentAlreadyExist = await getAllAppointments({
      where: {
        roomId: requestData.data.roomId,
        date: requestData.data.date,
        [Op.and]: [
          {
            [Op.and]: [
              { startTime: { [Op.lt]: requestData.data.endTime } },
              { endTime: { [Op.gt]: requestData.data.startTime } },
            ],
          },
        ],
      },
    });

    if (isAppointmentAlreadyExist.length > 0) {
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
  const id = parseInt(req.params.id, 10);
  const requestParams = z.number({ coerce: true }).positive().safeParse(id);
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
  const id = parseInt(req.params.id, 10);
  console.log(id, req.body);
  const requestParams = z.number({ coerce: true }).positive().safeParse(id);
  console.log(requestParams);

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
  // const departmentToNumber = parseInt(req.body.departmentId, 10);

  // Ensure roomId and staffId are valid numbers
  // const roomId = parseInt(req.body.roomId, 10);
  // const staffId = parseInt(req.body.staffId, 10);

  // Check if roomId and staffId are valid numbers
  // if (isNaN(roomId) || isNaN(staffId)) {
  //   throw new Error("RoomId and staffId must be valid numbers");
  // }
  const data = {
    ...req.body,
    // departmentId: departmentToNumber,
    // roomId: roomId,
    // staffId: staffId,
  };
  const requestData = updateAppointmentInputSchema.safeParse(data);
  console.log("requestData", requestData);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }
  const isHolidayAlreadyExist = await getAllHoliday({
    where: {
      date: requestData.data.date,
    },
  });
  if (isHolidayAlreadyExist.length > 0) {
    responseConflict(res, "Cannot Schedule an Appointment on Holidays");
  }
  console.log(requestData);

  if (requestData.data.date && requestData.data.roomId) {
    const isAppointmentAlreadyExist = await getAllAppointments({
      where: {
        id: {
          [Op.not]: requestParams.data,
        },
        roomId: requestData.data.roomId,
        date: requestData.data.date,
        [Op.and]: [
          {
            [Op.and]: [
              { startTime: { [Op.lt]: requestData.data.endTime } },
              { endTime: { [Op.gt]: requestData.data.startTime } },
            ],
          },
        ],
      },
    });

    if (isAppointmentAlreadyExist.length > 0) {
      return responseConflict(res, "Appointment Already Exist");
    }
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
  getCount,
  store,
  getOne,
  updateOne,
  compareAppointmentCode,
  getAppointmentRoomId,
};
