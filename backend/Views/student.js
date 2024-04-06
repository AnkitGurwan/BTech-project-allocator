import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

import express from "express";
import { getAllProjects, IncreaseStepsDone, checkStudentAlloted, findStepsDone, newStudent, partner, finalpartner, partnerRequest, sentRequest } from "../Controllers/projectController.js";
import { getallstudent } from "../Controllers/userController.js";
import checkStudent from "../Middlewares/checkStudent.js";

const router = express.Router();

router.get("/allprojects", checkStudent, getAllProjects);
router.get("/checkAlloted/:email",checkStudent, checkStudentAlloted);
router.get("/partnerrequest/:student",checkStudent, partnerRequest);

router.get("/sentrequest/:student",checkStudent, sentRequest);
router.post("/newstudent",checkStudent, newStudent);
router.get("/partner/:student/:partner",checkStudent, partner);
router.get("/finalpartner/:student/:partner",checkStudent, finalpartner);
router.get("/stepsdone/find/:email",checkStudent, findStepsDone);
router.get("/stepsdone/increase",checkStudent, IncreaseStepsDone);
router.get("/allstudents",checkStudent, getallstudent);

const student = router;
export default student;