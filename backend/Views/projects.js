import express from "express";
import { getAllProjects, getInterestedStudents, getOwnerDetails } from "../Controllers/projectController.js";
const router = express.Router();


router.get("/allprojects", getAllProjects);
router.get("/ownerdetails/:id", getOwnerDetails);
router.get("/getInterestedStudents/:id", getInterestedStudents);


const project = router;

export default project;