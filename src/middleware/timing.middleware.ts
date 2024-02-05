import { NextFunction, Request, Response } from "express";

export const timingMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.startTimestamp = Date.now();
  next();
};
