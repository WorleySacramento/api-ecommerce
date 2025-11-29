import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { getAuth } from 'firebase-admin/auth';



export const auth = (app: express.Express) => {
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (token) {
      try {
        const decodeIdToken = await getAuth().verifyIdToken(token, true)
        console.log('decodeIdToken', decodeIdToken);
        return next();
      } catch (error) {
        next(new UnauthorizedError());
      }
    }
    next(new UnauthorizedError());
  });
}