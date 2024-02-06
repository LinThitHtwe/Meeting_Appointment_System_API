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
  createAccount,
  getAccountById,
  getAllAccounts,
  storeAccountInputSchema,
  updateAccount,
} from "../services/account.service";

const getAll = asyncHandler(async (req, res, next) => {
  const accounts = await getAllAccounts();
  return responseOk(res, 200, accounts);
});

const store = asyncHandler(async (req, res, next) => {
  const requestData = storeAccountInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }
  const account = await sequelize.transaction(async (transaction) => {
    createAccount(requestData.data, { transaction });
  });

  return responseOk(res, 201, account);
});

const getOne = asyncHandler(async (req, res, next) => {
  const requestParams = z
    .number({ coerce: true })
    .positive()
    .safeParse(req.params.id);

  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }

  const account = await getAccountById(requestParams.data);
  if (!account) {
    return responseNotFounds(res, "Account not found");
  }
  return responseOk(res, 200, account);
});

const updateOne = asyncHandler(async (req, res, next) => {
  const requestParams = z
    .number({ coerce: true })
    .positive()
    .safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const isAccountExist = await getAccountById(requestParams.data);
  if (!isAccountExist) {
    return responseNotFounds(res, "Account not found");
  }
  const requestData = storeAccountInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }
  const account = await sequelize.transaction(async (transaction) =>
    updateAccount(requestData.data, {
      transaction,
      where: {
        id: requestParams.data,
      },
    })
  );

  return responseOk(res, 200, account);
});

export default {
  getAll,
  store,
  getOne,
  updateOne,
};
