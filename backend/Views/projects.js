import express from "express";
import { getAllProjects } from "../Controllers/projectController.js";
const router = express.Router();


router.get("/allprojects", getAllProjects);


const project = router;

export default project;