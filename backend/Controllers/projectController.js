import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });

import Project from "../Models/Project.js";
import Student from "../Models/Student.js";
import User from "../Models/User.js";

//get all projects
const getAllProjects = async (req, res) => {
    try{
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch(err) {
        res.status(500).json({msg : err.message});
      }
};


//check student is alloted a project or not
const checkStudentAlloted = async (req, res) => {
    try{
        const email = req.params.email;
        
        const student = await Student.find({ email: email });

        let flag = false;

        if (student && student[0] && String(student[0].projectName) !== "000000000000000000000000") {
            flag = true;
        }

        if (flag) res.status(200).json({id : String(student[0].projectName)});
        else res.status(202).json({ msg: "not registered" });
    }
    catch(err) {
        res.status(500).json({msg : err.message});
      }
    
};


//register a new student
const newStudent = async (req, res) => {
    try{
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

            res.status(200).json({ msg: "Success" });
        }
        else res.status(202).json({ msg: "already there" });
    }
    catch(err) {
        res.status(500).json({msg : err.message});
    }
}


//get owner details
const getOwnerDetails = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findById(id);

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
const findStepsDone = async (req, res) => {
    try{
        const email = req.params.email;

        const student = await Student.find({ email: email});
        const ans = student ? student[0].stepsDone : 0;

        res.status(200).json({ ans : ans });
    }
    catch(err) {
        res.status(500).json({msg : err.message});
    }
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


//select a project
const selectProject = async (req, res) => {
        const accessToken = req.params.accessToken;

        //get user details
        const url = 'https://graph.microsoft.com/v1.0/me';
        const response = await fetch(url, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
      
      if (response.ok) {
        const data = await response.json();
        const email = data.mail;

        const pId = req.params.id;
        const project = await Project.findById(pId);
        
        const owner = await User.findById(project.ownerDetails);
        const ownerEmail = owner.email;

        const user = await Student.findOne({ email : email});
        const partnerId = user.partner;

        const partner = await Student.findById(partnerId);
        const partner_email = partner.email;


        if (email === req.params.partner) {
            res.status(350).json({ "msg": "Please Select A Partner" });
        }

        if (project.interestedPeople.length !== 0) {
            res.status(400).json({ msg: "Project Already Allotted." });
        } 
        else {
            const other_user = partner_email;
            const isValidUser = await Student.findOne({ email: other_user });

            if (user && String(user.projectName) !== "000000000000000000000000") {
                res.status(401).json({ msg: "Project Already Allotted To You." });
            } else if (isValidUser) {
                if (String(isValidUser.projectName) !== "000000000000000000000000") {
                    res.status(401).json({ msg: "Project Already Allotted To Partner." });
                } else {
                    if (isValidUser && project && user) {
                        const addtostudu1 = await Student.findByIdAndUpdate(user._id, { partner: isValidUser._id });
                        const addtostudu2 = await Student.findByIdAndUpdate(User._id, { $push: { intrestedLength: project._id } });
                        const addtostudu3 = await Student.findByIdAndUpdate(isValidUser._id, { partner: user._id });
                        const addtostudu4 = await Student.findByIdAndUpdate(isValidUser._id, { $push: { intrestedLength: project._id } });

                        const addtointrestedpeople = await Project.findByIdAndUpdate(project._id, { $push: { interestedPeople: user.email } });
                        const addtointrestedpeople2 = await Project.findByIdAndUpdate(project._id, { $push: { interestedPeople: isValidUser.email } });
                    }

                    const subject = `BTP-398`;
                    const body = `User with names : ${user.name} ${isValidUser.name} has registered for the project : ${project.title.slice(0,20)}.\n${process.env.FRONTENDURL}/login .\nKindly login to webiste and open the project and you can check user/group details.
                    `
                    sendEmail(ownerEmail,body,subject);
                    res.status(200).json({ msg: "Success" });
                }
            } else {
                res.status(403).json({ msg: "Partner Not Exists" });
            }
        }
      }
};


//de select a project
const deselectProject = async (req, res) => {
    const accessToken = req.params.accessToken;

    //get user details
    const url = 'https://graph.microsoft.com/v1.0/me';

    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        },
    });

    const pId = req.params.id;
    const project = await Project.findById(pId);

    if (project) {
        if (project.interestedPeople.length === 0) {
            res.status(400).json({ msg: "No Project Allotted Yet." });
        } else {
            const user = await Student.findOne({ email: req.params.user });

            if (false) return;
            else {
                if (project && user) {
                    const partner = await Student.findById(user.partner);
                    const deltointrestedpeople = await Project.findByIdAndUpdate(project._id, { $pull: { interestedPeople: user.email } });
                    const deltointrestedpeople2 = await Project.findByIdAndUpdate(project._id, { $pull: { interestedPeople: partner.email } });
                    res.status(200).json({ msg: "Success" });
                }
            }
        }
    } else {
        res.status(405).json({ msg: "Failure" });
    }
};
export {
    getAllProjects, checkStudentAlloted, newStudent, getOwnerDetails, getInterestedStudents, findStepsDone, IncreaseStepsDone, selectProject, deselectProject
}
