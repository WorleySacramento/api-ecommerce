import express from "express";
import { initializeApp, cert } from 'firebase-admin/app';
import { routes } from "./routes/index";
import { errorHandler } from "./middlewares/error.handler.middleware";

const serviceAccount = require('../firebase-adminsdk-.json');

initializeApp({
  credential: cert(serviceAccount),
});
const app = express();


routes(app);
errorHandler(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

