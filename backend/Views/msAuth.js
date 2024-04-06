import express from "express"
import { profLogin, studentLogin, getToken, getInfo, logOut, getToken2, getInfoProf, logOutProf } from "../Controllers/msAuthController.js";
import { routes } from "../routes.js";

const authRouter = express.Router();
 
authRouter.get(routes.microsoft + "/prof", profLogin);
authRouter.get(routes.microsoft + "/student", studentLogin);

authRouter.get(routes.microsoft + "/getToken", getToken);
authRouter.get(routes.microsoft + "/getToken2", getToken2);

authRouter.get(routes.microsoft + "/getInfo", getInfo);
authRouter.get(routes.microsoft + "/getInfoProf", getInfoProf);

authRouter.get(routes.microsoft + "/logout", logOut);
authRouter.get(routes.microsoft + "/logoutprof", logOutProf);

export default  authRouter ;