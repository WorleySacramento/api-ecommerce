import express from "express";
import { usersRoute } from "./users.route";
import { authRoutes } from "./auth.route";
import { companyRoute } from "./companies.route";
import { categoryRoute } from "./categories.route";

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(authRoutes);
  app.use(usersRoute);
  app.use(companyRoute);
  app.use(categoryRoute)
};