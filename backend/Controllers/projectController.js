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
    
      const user = await User.findById(String(project.ownerDetails));
      
      if (!user) {
          res.status(403).json({ msg: "Owner Not Found" });
      } else {
          res.status(200).json(user);
      }
  }
};

//get interested students in a project
const getInterestedStudents = async (req, res) => {
    try{
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
    }
    catch(err) {
        res.status(500).json({msg : err.message});
    }
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
    try{
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
    catch(err) {
        res.status(500).json({msg : err.message});
    }
}


//select a project
const selectProject = async (req, res) => {
    try{
        const email = req.params.email;
        console.log(email)
       
        const student = await Student.findOne({ email : email});
        const partnerId = student.partner;
        console.log(partnerId)

        if (String(student.partner) === "000000000000000000000000") {
            res.status(401).json({ "msg": "Please Select A Partner" });
        }

        else {
            const partner = await Student.findById(partnerId);
            console.log(partner)

            const pId = req.params.id;
            const project = await Project.findById(pId);
            
            const owner = await User.findById(project.ownerDetails);
            const ownerEmail = owner.email;

            if (project.interestedPeople.length !== 0) {
                res.status(402).json({ msg: "Project Already Allotted." });
            } 
            else {

                if (student && String(student.projectName) !== "000000000000000000000000") {
                    res.status(403).json({ msg: "Project Already Allotted To You." });
                } 
                else if (isValidUser) 
                {
                    if (String(partner.projectName) !== "000000000000000000000000") {
                        res.status(404).json({ msg: "Project Already Allotted To Partner." });
                    } 
                    else {
                        if (student && project && partner) 
                        {
                            await Student.findByIdAndUpdate(student._id, { $push: { interestedLength: project._id } });
                            await Student.findByIdAndUpdate(partner._id, { $push: { interestedLength: project._id } });

                            await Project.findByIdAndUpdate(project._id, { $push: { interestedPeople: student.email } });
                            await Project.findByIdAndUpdate(project._id, { $push: { interestedPeople: partner.email } });
                        }

                        const subject = `BTP-398`;
                        const body = `\nUser with names : ${student.name} ${partner.name} has registered for the project : ${project.title.slice(0,20)}.\n\n${process.env.FRONTENDURL}/login .\n\nKindly login to webiste and open the project and you can check user/group details.
                        `
                        sendEmail(ownerEmail, body, subject);
                        res.status(200).json({ msg: "Success" });
                    }
                } else {
                    res.status(500).json({ msg: "Partner Not Exists" });
                }
            }
        }
    }
    catch(err) {
        res.status(500).json({msg : err.message});
    }
};



//de select a project
const deselectProject = async (req, res) => {
    const email = req.params.email;

    const pId = req.params.id;
    const project = await Project.findById(pId);

    if (project) {
        if (project.interestedPeople.length === 0) {
            res.status(401).json({ msg: "Project not alloted yet." });
        } else {
            const user = await Student.findOne({ email: email });

            if ( !user ) res.status(402).json({ msg: "User dont exist." });
            else {
                if (project && user) {
                    const partner = await Student.findById(user.partner);
                    await Project.findByIdAndUpdate(project._id, { $pull: { interestedPeople: user.email } });
                    Project.findByIdAndUpdate(project._id, { $pull: { interestedPeople: partner.email } });
                    res.status(200).json({ msg: "Success" });
                }
            }
        }
    } else {
        res.status(500).json({ msg: "Failure" });
    }
};
export {
    getAllProjects, checkStudentAlloted, newStudent, getOwnerDetails, getInterestedStudents, findStepsDone, IncreaseStepsDone, selectProject, deselectProject
}
