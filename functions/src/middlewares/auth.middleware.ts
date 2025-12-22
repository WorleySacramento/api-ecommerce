import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error';
import { getAuth } from 'firebase-admin/auth';
import { UserService } from '../services/user.service';
import { ForbiddenError } from '../errors/forbiden.errr';
import { NotFoundError } from '../errors/not-found.error';



export const auth = (app: express.Express) => {
  app.use(async (req: Request, res: Response, next: NextFunction) => {

    if (isRoutUnAuthenticated(req)) {
      return next();
    }

    const token = req.headers.authorization?.split('Bearer ')[1];

    if (token) {
      try {
        const decodeIdToken = await getAuth().verifyIdToken(token, true)

        if (decodeIdToken.firebase.sign_in_provider === "anonymous") {
          return next()
        }

        req.user = await new UserService().getById(decodeIdToken.uid);;

        return next();
      } catch (error) {
        if(error instanceof NotFoundError){
          return next(new ForbiddenError())
        }else {
          return next(new UnauthorizedError());
        }
      }
    }

    // If there is no token, don't block here — let the `allowAnonymousUser`
    // middleware decide whether the route is public or forbidden.
    return next();
  });

  const isRoutUnAuthenticated = (req: Request): boolean => {

    if (req.method === 'POST') {
      if ((req.url.startsWith('/auth/login') ||
        req.url.startsWith('/auth/recovery') ||
        req.url.startsWith('/auth/signin'))
      ) {
        return true;
      }
    }
    return false;

  }
}