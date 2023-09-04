import { Request, Response } from "express";
import { TaskBusiness } from "../business/TaskBusiness";
import { deleteTaskInputDTO, TaskInputDTO, UpdateTaskInputDTO } from "../model/post";


export class TaskController {
  constructor(private taskBusiness: TaskBusiness ) {}


  public createTask = async (req: Request, res: Response):Promise<void> => {
    try {
      const { id, title, description, deadline, status,  created_at, authorId } = req.body;

      const postId: any = Date.now().toString()
     

      const input: TaskInputDTO = {
        id:postId,
        title,
        description,
        deadline,
        status,
        created_at,
        authorId
      };

      await this.taskBusiness.createTask(input);

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

   

      const tasks = await this.taskBusiness.getAllPosts()

      res.status(201).send({ tasks });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };


  public deleteTaskById = async (req: Request, res: Response) => {
    try {

      const { id } = req.body;

      const input: deleteTaskInputDTO = {
        id
      };


    
      await this.taskBusiness.deleteTaskById(req.params.id)

      res.status(201).send({ message: "Tarefa excluída com sucesso!" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };

  public updateTaskById = async (req: Request, res: Response) => {
    try {



      const input: UpdateTaskInputDTO = {
        id: req.body,
        title: req.body,
        description: req.body,
        deadline: req.body,
        status: req.body,
        created_at: req.body,
        authorId: req.body  
      }
   
     

     
     
      const tasks = await this.taskBusiness.updateTaskById(input);

      res.status(201).send({ tasks });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };

}
