import { NextFunction, Request, Response } from "express";
import AppException from "../Exception/AppException";

type Props = {
  error: any;
  req: Request;
  res: Response;
  next: NextFunction;
};

export const globalErrorHandler = ({ error, req, res, next }: Props) => {
  console.log("yyyyyyyyyyyyyyyyyyyyy");
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  // if (error instanceof AppException) {
  //   statusCode = error.statusCode;
  //   errorMessage = error.message;
  // }
  return res.status(statusCode).json({ message: errorMessage });
};
