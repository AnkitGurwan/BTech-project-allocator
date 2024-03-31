import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

import express from "express";
import { checkStudentAlloted, newStudent } from "../Controllers/projectController.js";

const router = express.Router();

router.get("/checkAlloted/:accessToken", checkStudentAlloted);
router.post("/newstudent", newStudent);

const student = router;
export default student;