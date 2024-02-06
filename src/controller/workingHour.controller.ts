import { getAllWorkingHour } from "../services/workingHour.service";
import { asyncHandler, responseOk } from "../utils/response_handler";

const index = asyncHandler(async (req, res, next) => {
    const workingHours = await getAllWorkingHour();
    return responseOk(res, 200, workingHours);
})

export default { index };