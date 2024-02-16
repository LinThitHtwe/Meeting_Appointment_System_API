import {login} from '../services/account.service'
import {
    asyncHandler,
    responseBadRequest,
    responseNotFounds,
    responseOk,
  } from "../utils/response_handler";

const userLogin = asyncHandler(async (req,res,next) => {
    const reqBody = req.body; 
    console.log("🚀 ~ userLogin ~ reqBody:", reqBody)
    if (!reqBody.username || !reqBody.password) {
        return responseBadRequest(res, "Invalid input data!");
    }
    const user = await login(reqBody.username,reqBody.password);
    if (user) {
        return responseOk(res, 200);
    }
    return responseNotFounds(res,"Log in failed!");
})

export default {
    userLogin
}