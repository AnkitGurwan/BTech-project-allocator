import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

import express from "express";
import { IncreaseStepsDone, checkStudentAlloted, findStepsDone, newStudent, partner, finalpartner, partnerRequest, sentRequest } from "../Controllers/projectController.js";
import { getallstudent } from "../Controllers/userController.js";

const router = express.Router();

router.get("/checkAlloted/:email", checkStudentAlloted);
router.get("/partnerrequest/:student", partnerRequest);
router.get("/sentrequest/:student", sentRequest);
router.post("/newstudent", newStudent);
router.get("/partner/:student/:partner", partner);
router.get("/finalpartner/:student/:partner", finalpartner);
router.get("/stepsdone/find/:email", findStepsDone);
router.get("/stepsdone/increase", IncreaseStepsDone);
router.get("/allstudents", getallstudent);

const student = router;
export default student;