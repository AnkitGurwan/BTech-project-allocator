import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });

import Project from "../Models/Project.js";
import Student from "../Models/Student.js";

//get all projects
const getAllProjects = async (req, res) => {
    const projects = await Project.find();
    res.status(200).json(projects);
};


//check student is alloted a project or not
const checkStudentAlloted = async (req, res) => {
    const accessToken = req.params.accessToken;
    console.log("acc",accessToken)

    const url = 'https://graph.microsoft.com/v1.0/me';

    const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const email = data.mail;
        
        const student = await Student.find({ email: email });

        let flag = false;

        if (student && student[0] && String(student[0].projectName) !== "000000000000000000000000") {
            flag = true;
        }

        if (flag) res.status(200).json({id: String(student[0].projectName)});
        else res.status(400).json({ msg: "false" });
      } 
      else {
        res.status(401).json( { msg:'User not registered'});
      }
    
};


//register a new student
const newStudent = async (req, res) => {
    const isValid = await Student.findOne({ email: req.body.userEmail });

    if (!isValid) {
        await Student.create({
            name: req.body.userName,
            email: req.body.userEmail,
            rollNum: req.body.userRoll,
            projectName: '000000000000000000000000',
            partner: '000000000000000000000000',
            is_banned: false,
        });
    }
    res.status(200).json({ msg: "Success" });
}
export {
    getAllProjects, checkStudentAlloted, newStudent
}
