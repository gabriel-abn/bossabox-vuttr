import { Router } from "express";
import adaptRoute from "./adapters/express-route-adapter";
import { LoginFactory } from "./factories/login-factory";
import { SignUpFactory } from "./factories/sign-in-factory";

const routes = Router();

routes.post("/auth/signup", adaptRoute(SignUpFactory.make()));

routes.post("/auth/login", adaptRoute(LoginFactory.make()));

routes.get("/tools");

routes.get("/tools/:id");

routes.post("/tools");

routes.delete("/tools/:id");

export default routes;
