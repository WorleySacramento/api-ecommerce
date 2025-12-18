import express from "express";
import { initializeApp as initializeAppAdmin } from 'firebase-admin/app';
import { initializeApp as initializeAppClient } from "firebase/app";
import { routes } from "./routes/index";
import { errorHandler } from "./middlewares/error.handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middeware";
import { auth } from "./middlewares/auth.middleware";
import { onRequest } from "firebase-functions/v1/https";

initializeAppAdmin();

initializeAppClient({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
});

const app = express();

auth(app)
routes(app);
pageNotFoundHandler(app);
errorHandler(app);

export const api = onRequest(app);