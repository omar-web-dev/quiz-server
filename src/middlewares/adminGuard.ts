import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '../models/UserModel';
import createHttpError from 'http-errors'
import { AuthRequest } from '../interfaces/AuthRequest';

export const adminGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new createHttpError.Unauthorized('You are not authorized to access this page')
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded._id);
    if (!user || !user.isAdmin) {
        throw new createHttpError.Unauthorized('You are not authorized to access this page')
    }
    req.user = user;
    next();
};
