import { NextFunction, Request, Response } from 'express'
import { AuthRequest } from '../interfaces/AuthRequest'
import { addUserService, getAllUsersService, getUserByIdService } from '../services/UserServices'

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersService()
        res.send({ success: true, data: users })
    } catch (err) {
        return next(err)
    }
}

export const addUserController = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newUser = req.body;
      const data = await addUserService(newUser);
      res.send({
        success: true,
        data: data,
        message: "User added successfully",
      });
    } catch (err) {
      return next(err);
    }
  };

export const getUserByIdController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string }
        const data = await getUserByIdService(id)
        res.send({ success: true, data: data })
    } catch (err) {
        return next(err)
    }
}


