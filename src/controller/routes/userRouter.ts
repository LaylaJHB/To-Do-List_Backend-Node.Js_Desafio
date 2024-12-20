import express from "express";
import { UserBusiness } from "../../business/UserBusiness";
import { UserDatabase } from "../../data/mySQL/UserDatabase";
import { UserController } from "../UserController";


export const userRouter = express.Router()

const userDatabase = new UserDatabase()

const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness)

userRouter.get("/",(req, res) => userController.getUsers(req, res))

userRouter.post('/create',(req, res) => userController.createUser(req, res))

userRouter.post('/login',(req, res) => userController.login(req, res))

userRouter.get('/getUserById/:id',(req, res) => userController.getUserById(req, res))

userRouter.delete('/deleteUserById/:id', (req, res) => userController.deleteUserById(req, res))

userRouter.post("/updateUserById", (req, res) => userController.updateUserById(req, res))
