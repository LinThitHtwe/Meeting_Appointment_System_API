import { NextFunction, Request, Response } from "express";
import AppException from "../Exception/AppException";

type Props = {
  error: Error | AppException;
  req: Request;
  res: Response;
};

export const globalErrorHandler = ({ error, req, res }: Props) => {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  if (error instanceof AppException) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }

  return res.status(statusCode).json({ message: errorMessage });
};
