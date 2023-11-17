import express from "express";
import { UserBusiness } from "../../business/UserBusiness";
import { UserDatabase } from "../../data/mySQL/UserDatabase";
import { UserController } from "../UserController";


export const userRouter = express.Router()

const userDatabase = new UserDatabase()

const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness)

userRouter.get("/getAll",(req, res) => userController.getUsers(req, res))

userRouter.post('/create',(req, res) => userController.createUser(req, res))

userRouter.post('/login',(req, res) => userController.login(req, res))


// Projeto (nome do domínio): todolist.com -> retorna a página home do site - GET todolist.com 

//Criar tarefa: POST todolist.com/task 

//Buscar todas as tarefas: 
    //sem filtros:
    // GET todolist.com/task

    //paginado: 
    // GET todolist.com/task?page=2&orderby=title
    

//Deletar uma tarefa: DELETE todolist.com/task/:id

//Editar uma tarefa: POST todolist.com/task/:id