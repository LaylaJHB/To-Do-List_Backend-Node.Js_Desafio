import express from "express";
import { TaskBusiness } from "../../business/TaskBusiness"
import { TaskDatabase } from "../../data/mySQL/TaskDatabase"
import { TaskController } from "../TaskController"


export const taskRouter = express.Router()



const taskDatabase = new TaskDatabase()



const taskBusiness = new TaskBusiness(taskDatabase)
const taskController = new TaskController(taskBusiness)


taskRouter.post("/create", (req, res) => taskController.createTask(req, res))
taskRouter.get("/searchPost/:id", (req, res) => taskController.searchPost(req, res))
taskRouter.get("/getAllPosts", (req, res) => taskController.getAllPosts(req, res))