import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import User from '../models/UserModel';
import createHttpError from 'http-errors'
import { AuthRequest } from '../interfaces/AuthRequest';

// export const authGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         console.log(token)
//         if (!token) {
//             throw new createHttpError.Unauthorized('You are not authorized to access this page')
//         }
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
//         const user = await User.findById(decoded._id);
//         if (!user) {
//             throw new createHttpError.Unauthorized('You are not authorized to access this page')
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         next(error);
//     }
// };

export const authGuard = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // 1. Extract the JWT token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        // 2. Check if token is missing
        if (!token) {
            throw new createHttpError.Unauthorized('You are not authorized to access this page');
        }

        // 3. Verify the JWT token
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

        // 4. Find the user associated with the decoded token
        const user = await User.findById(decoded._id);

        // 5. Check if user exists
        if (!user) {
            throw new createHttpError.Unauthorized('You are not authorized to access this page');
        }

        // 6. Attach the user object to the request for later use
        req.user = user;

        // 7. Continue to the next middleware or route handler
        next();
    } catch (error) {
        // 8. Handle errors by passing them to the Express error handling middleware
        next(error);
    }
};


