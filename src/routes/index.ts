import express from "express";
import { usersRoute } from "./users.route";
import { authRoutes } from "./auth.route";
import { companyRoute } from "./companies.route";
import { categoryRoute } from "./categories.route";
import { productRoute } from "./products.route";
import { paymentRoute } from "./payments.route";
import { ordersRoute } from "./orders.route";
import { allowAnonymousUser } from "../middlewares/allow-anonymous-user.middleware.ts";

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(allowAnonymousUser)
  app.use(express.urlencoded({ extended: true }));
  app.use(authRoutes);
  app.use(usersRoute);
  app.use(companyRoute);
  app.use(categoryRoute)
  app.use(productRoute)
  app.use(paymentRoute);
  app.use(ordersRoute);
};