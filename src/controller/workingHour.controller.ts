import { WorkingHourType } from "../../type";
import { createWorkingHour, getAllWorkingHour, storeWorkingHourInputSchema } from "../services/workingHour.service";
import { asyncHandler, responseOk, responseUnprocessableEntity } from "../utils/response_handler";

const index = asyncHandler(async (req, res, next) => {
    const workingHours = await getAllWorkingHour();
    return responseOk(res, 200, workingHours);
})

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

export default { index, store };