import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });

import Project from "../Models/Project.js";
import Student from "../Models/Student.js";
import User from "../Models/User.js";

//get all projects
const getAllProjects = async (req, res) => {
    const projects = await Project.find();
    res.status(200).json(projects);
};


//check student is alloted a project or not
const checkStudentAlloted = async (req, res) => {
    const accessToken = req.params.accessToken;

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


//get owner details
const getOwnerDetails = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findById(id);
  console.log(project)

  if (!project) {
      res.status(404).json({ msg: "Not Found" });
  } else {
      const user = await User.findById(project.ownerDetails);
      if (!user) {
          res.status(403).json({ msg: "Owner Not Found" });
      } else {
          res.status(200).json(user);
      }
  }
};

//get interested students in a project
const getInterestedStudents = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findById(id);
  const interestedStudents = project.interestedPeople;
  let array = [];

  if (interestedStudents) {
      for (let i = 0; i < interestedStudents.length; i++) {
          const student = await Student.find({ email: interestedStudents[i] });
          array.push(student[0].email);
      }
  }
  res.status(200).json(array);
};

//find steps done by a student
const findStepsDone = (req, res) => {
    const id = req.params.email;

    const student = Student.find({ email: id});
    const ans = student.stepsDone;

    res.status(200).json(ans);
}


//increase steps done by a student
const IncreaseStepsDone = async (req, res) => {
    const id = req.params.email;

    const student = await Student.findOneAndUpdate(
        { email: id },
        { $inc: { stepsDone: 1 } }, // Increment stepsDone by 1
        { new: true } // Return the updated document
    );

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(student);
}

export {
    getAllProjects, checkStudentAlloted, newStudent, getOwnerDetails, getInterestedStudents, findStepsDone, IncreaseStepsDone
}
