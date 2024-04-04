import express from "express"
import { profLogin, studentLogin, getToken, getInfo, logOut } from "../Controllers/msAuthController.js";
import { routes } from "../routes.js";

const authRouter = express.Router();
 
authRouter.get(routes.microsoft + "/prof", profLogin);
authRouter.get(routes.microsoft + "/student", studentLogin);
authRouter.get(routes.microsoft + "/getToken", getToken);
authRouter.get(routes.microsoft + "/getInfo", getInfo);
authRouter.get(routes.microsoft + "/logout", logOut);

export default  authRouter ;