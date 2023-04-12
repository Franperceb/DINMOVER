import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';

export const restrictAccess =
  (...allowedRoles: string[]) =>
    (_req: Request, res: Response, next: NextFunction) => {
      const user = res.locals.user;
      if (!allowedRoles.includes(user.role)) {
        return next(
          new ErrorResponse('You are not allowed to perform this action', 403)
        );
      }

      next();
    };

