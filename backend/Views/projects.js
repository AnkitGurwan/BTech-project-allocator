import express from "express";
import { deselectProject, getAllProjects, getInterestedStudents, getOwnerDetails, selectProject } from "../Controllers/projectController.js";
const router = express.Router();


router.get("/allprojects", getAllProjects);
router.get("/ownerdetails/:id", getOwnerDetails);
router.get("/getInterestedStudents/:id", getInterestedStudents);
router.get("/selectProject/:id/:email", selectProject);
router.get("/deselectproject/:id/:email", deselectProject);


const project = router;

export default project;