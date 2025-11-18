import express from "express";
import { usersRoute } from "./users.route";

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(usersRoute);
};