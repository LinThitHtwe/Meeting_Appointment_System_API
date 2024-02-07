import { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";

type BaseResponse = {
  data: unknown;
  meta: {
    timestamp: number | undefined;
  };
};

export const responseOk = (
  res: Response,
  statusCode: number,
  data?: unknown
) => {
  const response: BaseResponse = {
    data: data,
    meta: {
      timestamp: undefined,
    },
  };

  const endTimestamp = new Date().getTime();
  const startTimestamp = res.locals.startTimestamp;
  if (startTimestamp) {
    response.meta.timestamp = endTimestamp - startTimestamp / 1000;
  }
  return res.status(statusCode).json(response);
};

export const responseNotFounds = (
  res: Response,
  errorMessage: string = "Not Found"
) => {
  return res.status(404).json({
    status: "fail",
    message: errorMessage,
  });
};

export const responseUnprocessableEntity = (
  res: Response,
  error: z.ZodError
) => {
  return res.status(422).json({
    status: "fail",
    error,
  });
};

// export const asyncHandler =
//   (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
//     Promise.resolve(fn(req, res, next))
//       .then((abc) => {
//         console.log("thennnn", abc);
//         next();
//       })
//       .catch((d) => console.log("aysnccc---", d))
//       .finally(() => {
//         console.log("finally");
//         next();
//       });

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
