import { Router } from "express";
import adaptRoute from "./adapters/express-route-adapter";
import { GetToolsFactory } from "./factories/get-tools-factory";
import { LoginFactory } from "./factories/login-factory";
import { SignUpFactory } from "./factories/sign-in-factory";
import authMiddleware from "./middlewares/auth-middleware";

const routes = Router();

routes.post("/auth/signup", adaptRoute(SignUpFactory.make()));

routes.post("/auth/login", adaptRoute(LoginFactory.make()));

routes.get("/tools", authMiddleware, adaptRoute(GetToolsFactory.make()));

routes.get("/tools/:id", authMiddleware, adaptRoute(GetToolsFactory.make()));

routes.post("/tools");

routes.delete("/tools/:id");

export default routes;
