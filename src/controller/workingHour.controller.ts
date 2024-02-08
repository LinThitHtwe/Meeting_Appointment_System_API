import { WorkingHourType } from "../../type";
import { z } from "zod";
import {
  storeWorkingHourInputSchema,
  createWorkingHour,
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

const store = asyncHandler(async (req, res, next) => {
    const requestData = storeWorkingHourInputSchema.safeParse(req.body);
    console.log(req.body);

    if (!requestData.success) {
        return responseUnprocessableEntity(res, requestData.error);
    }
    const workingHours = await createWorkingHour(requestData.data);
    if (workingHours) {
        return responseOk(res, 201, workingHours);
    }
})

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

export default { index, store, show };
