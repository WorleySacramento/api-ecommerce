import express from "express";
import { usersRoute } from "./users.route";
import { authRoutes } from "./auth.route";
import { companyRoute } from "./companies.route";

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(authRoutes);
  app.use(usersRoute);
  app.use(companyRoute);
};