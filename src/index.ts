import express from "express";
import { initializeApp as initializeAppAdmin, cert } from 'firebase-admin/app';
import {initializeApp as initializeFireBaseApp} from "firebase/app";
import { routes } from "./routes/index";
import { errorHandler } from "./middlewares/error.handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middeware";

const serviceAccount = require('../firebase-adminsdk-.json');

initializeAppAdmin({
  credential: cert(serviceAccount),
});
initializeFireBaseApp({
  apiKey: process.env.API_KEY,
})
const app = express();


routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

