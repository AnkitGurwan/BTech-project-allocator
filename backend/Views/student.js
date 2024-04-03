import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

import express from "express";
import { IncreaseStepsDone, checkStudentAlloted, findStepsDone, newStudent } from "../Controllers/projectController.js";

const router = express.Router();

router.get("/checkAlloted/:email", checkStudentAlloted);
router.post("/newstudent", newStudent);
router.get("/stepsdone/find/:email", findStepsDone);
router.get("/stepsdone/increase", IncreaseStepsDone);

const student = router;
export default student;