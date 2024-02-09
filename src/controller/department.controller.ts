import {
  asyncHandler,
  responseConflict,
  responseNotFounds,
  responseOk,
  responseUnprocessableEntity,
} from "../utils/response_handler";

import { sequelize } from "../../config/db";
import { z } from "zod";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  storeDepartmentInputSchema,
  updateDepartment,
} from "../services/department.service";
import { Op } from "sequelize";

const getAll = asyncHandler(async (req, res, next) => {
  const departments = await getAllDepartments();
  return responseOk(res, 200, departments);
});

const store = asyncHandler(async (req, res, next) => {
  const requestData = storeDepartmentInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }
  const isDepartmentAlreadyExist = await getAllDepartments({
    where: {
      name: requestData.data.name,
    },
  });

  if (isDepartmentAlreadyExist.length > 0) {
    return responseConflict(res, "Department Already Exist");
  }
  const department = await sequelize.transaction(async (transaction) =>
    createDepartment(requestData.data, { transaction })
  );

  return responseOk(res, 201, department);
});

const getOne = asyncHandler(async (req, res, next) => {
  const requestParams = z
    .number({ coerce: true })
    .positive()
    .safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const department = await getDepartmentById(requestParams.data);
  if (!department) {
    return responseNotFounds(res, "Department not found");
  }
  return responseOk(res, 200, department);
});

const updateOne = asyncHandler(async (req, res, next) => {
  const requestParams = z
    .number({ coerce: true })
    .positive()
    .safeParse(req.params.id);
  if (!requestParams.success) {
    return responseUnprocessableEntity(res, requestParams.error);
  }
  const isDepartmentExist = await getDepartmentById(requestParams.data);
  if (!isDepartmentExist) {
    return responseNotFounds(res, "Department not found");
  }
  const requestData = storeDepartmentInputSchema.safeParse(req.body);
  if (!requestData.success) {
    return responseUnprocessableEntity(res, requestData.error);
  }

  const isDepartmentAlreadyExist = await getAllDepartments({
    where: {
      id: {
        [Op.not]: requestParams.data,
      },
      name: requestData.data.name,
    },
  });
  if (isDepartmentAlreadyExist.length > 0) {
    return responseConflict(res, "Department Already Exist");
  }

  const department = await sequelize.transaction(async (transaction) =>
    updateDepartment(requestData.data, {
      transaction,
      where: {
        id: requestParams.data,
      },
    })
  );
  return responseOk(res, 200, department);
});

export default {
  getAll,
  store,
  getOne,
  updateOne,
};
