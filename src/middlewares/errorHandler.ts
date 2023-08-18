import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

// Error Handler
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.send({ success: false, message: err.error || err.message, status: err.status || 500 })
}

export default errorHandler;