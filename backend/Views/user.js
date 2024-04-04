import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

import express from "express";
import { sendFeedbackEmail } from "../Controllers/userController.js";

const router = express.Router();

router.get("/feedback",sendFeedbackEmail);

const user = router;
export default user;