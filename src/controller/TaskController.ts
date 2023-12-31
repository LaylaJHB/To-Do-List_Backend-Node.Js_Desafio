import { Request, Response } from "express";
import { TaskBusiness } from "../business/TaskBusiness";
import { deleteTaskInputDTO, STATUS_TYPES, TaskInputDTO, UpdateTaskInputDTO } from "../model/post";
import { Authenticator } from "../services/authenticator";

export class TaskController {
  constructor(private taskBusiness: TaskBusiness ) {}


  public createTask = async (req: Request, res: Response):Promise<void> => {
    try {
      const { id, title, description, deadline, status,  created_at, authorId } = req.body;

      const token = req.headers.authorization || ""

      const postId: any = Date.now().toString()
     
      console.log(req.headers || "vazio")
      const input: TaskInputDTO = {
        id:postId,
        title,
        description,
        deadline,
        status,
        created_at,
        authorId
      };

      await this.taskBusiness.createTask(input, token as string);

      res.status(201).send({ message: "Tarefa criada com sucesso!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public searchPost = async (req: Request, res: Response) => {
    try {

   
      const id: string = req.params.id

     
      const tasks = await this.taskBusiness.searchPost(id)

      res.status(201).send({ tasks });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };
  

  public getAllPosts = async (req: Request, res: Response) => {
    try {

   const options = {
    title: req.query.title,
    status: req.query.status,
    page: req.query.page
   }
      const result = await this.taskBusiness.getAllPosts(options)
     
      res.status(201).send(result);
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };


  public deleteTaskById = async (req: Request, res: Response) => {
    try {

      const { id } = req.body;
      const token = req.headers.authorization

      const input: deleteTaskInputDTO = {
        id
      };
    
      await this.taskBusiness.deleteTaskById(req.params.id, token as string)

      res.status(201).send({ message: "Tarefa excluída com sucesso!" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };

  public updateTaskById = async (req: Request, res: Response) => {
    try {


      const token = req.headers.authorization || "";

      const input: UpdateTaskInputDTO = {
        id: req.body.id as string,
        title: req.body.title as string,
        description: req.body.description as string,
        deadline: req.body.deadline as string,
        status: req.body.status as STATUS_TYPES,
        created_at: req.body.created_at as Date,
        authorId: req.body.authorId as string, 
        token: req.headers.authorization as string
      }
   
     

     
      const tasks = await this.taskBusiness.updateTaskById(input);

      res.status(201).send({ tasks });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };

}
