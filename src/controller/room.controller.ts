import { NextFunction, Request, Response } from "express";
import {
  asyncHandler,
  responseNotFounds,
  responseOk,
  responseUnprocessableEntity,
} from "../utils/response_handler";
import {
  createRoom,
  storeRoomInputSchema,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../services/room.service";
import { sequelize } from "../../config/db";
import { z } from "zod";

const getAll = asyncHandler(async (req, res, next) => {
  const rooms = await getAllRooms();
  return responseOk(res, 200, rooms);
});

const store = asyncHandler(async (req, res, next) => {
  const requestData = storeRoomInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }
  const room = await sequelize.transaction(async (transaction) => {
    createRoom(requestData.data, { transaction });
  });

  return responseOk(res, 201, room);
});

const getOne = asyncHandler(async (req, res, next) => {
  const requestParams = z
    .number({ coerce: true })
    .positive()
    .safeParse(req.params.id);

  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }

  const room = await getRoomById(requestParams.data);
  if (!room) {
    return responseNotFounds(res, "Room not found");
  }
  return responseOk(res, 200, room);
});

const updateOne = asyncHandler(async (req, res, next) => {
  const requestParams = z
    .number({ coerce: true })
    .positive()
    .safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const isRoomExist = await getRoomById(requestParams.data);
  if (!isRoomExist) {
    return responseNotFounds(res, "Room not found");
  }
  const requestData = storeRoomInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }
  const room = await sequelize.transaction(async (transaction) =>
    updateRoom(requestData.data, {
      transaction,
      where: {
        id: requestParams.data,
      },
    })
  );

  return responseOk(res, 200, room);
});

export default {
  getAll,
  store,
  getOne,
  updateOne,
};
