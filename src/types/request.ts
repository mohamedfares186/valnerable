import type { Request, Response } from "express";

interface UserRequest extends Request {
	user?: {
		userId: string,
		role: string
	}
}

interface UserResponse extends Response {
	statusCode: number,
	message: string,
}

export type { UserRequest, UserResponse };