import dotenv from "dotenv";
dotenv.config({path:"config/.env"});

import express from "express";
const app = express();


import cors from 'cors';
const corsOptions = {
    // origin: `${process.env.FRONTENDURL}`, 
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    credentials: true
  };
app.use(cors(corsOptions)); 


import sessions from "express-session";


app.use(express.json());


//mongoose connection
import connectDatabase from "./config/database.js"
connectDatabase();


const oneHour = 1000 * 60 * 60;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneHour },
    resave: false
}));

import authRouter from "./Views/msAuth.js";
app.use(authRouter)

import ProjectRouter from "./Views/projects.js";
app.use('/project',ProjectRouter);

import StudentRouter from "./Views/student.js";
app.use('/student',StudentRouter);

app.listen(process.env.PORT, (req, res, err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Server listening on PORT ",5000);
    }
})