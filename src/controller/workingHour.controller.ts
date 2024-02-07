import { z } from "zod";
import {
  getAllWorkingHour,
  getWorkingHourById,
} from "../services/workingHour.service";
import {
  asyncHandler,
  responseNotFounds,
  responseOk,
  responseUnprocessableEntity,
} from "../utils/response_handler";

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

  const room = await getWorkingHourById(requestParams.data);
  if (!room) {
    return responseNotFounds(res, "Working Hour not found");
  }
  return responseOk(res, 200, room);
});

export default { index, show };
