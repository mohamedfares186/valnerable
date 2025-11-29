import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

interface UserRequest extends Request {
  user?:
    | {
        userId: string;
        role: string;
        username: string;
      }
    | JwtPayload;
}

interface UserResponse extends Response {
  statusCode: number;
  message: string;
}

export type { UserRequest, UserResponse };
