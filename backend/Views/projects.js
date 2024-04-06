import express from "express";
import { deleteProject, deselectProject, downLoadDetails, getAllProjects, getInterestedStudents, getOwnerDetails, getOwnerProjects, getProjectDetails, newProject, selectProject, updateProjectDetails } from "../Controllers/projectController.js";
const router = express.Router();


router.get("/allprojects", getAllProjects);
router.get("/projectSpecific/:id", getProjectDetails);
router.get("/ownerdetails/:id", getOwnerDetails);

router.get("/getInterestedStudents/:id", getInterestedStudents);
router.get("/interestedpeople/:email", downLoadDetails);

router.get("/selectProject/:id/:email", selectProject);
router.get("/deselectproject/:id/:email", deselectProject);
router.post("/newProject/:email", newProject);
router.get("/specificProject/:email", getOwnerProjects);

router.delete("/deleteProject/:id", deleteProject);

router.patch("/updateProject/:id/:email", updateProjectDetails);


const project = router;

export default project;