import express from "express"
import { profLogin, studentLogin, getToken } from "../Controllers/msAuthController.js";
import { routes } from "../routes.js";

const authRouter = express.Router();
 
authRouter.get(routes.microsoft + "/prof", profLogin);
authRouter.get(routes.microsoft + "/student", studentLogin);
authRouter.get(routes.microsoft + "/getToken", getToken);

export default  authRouter ;