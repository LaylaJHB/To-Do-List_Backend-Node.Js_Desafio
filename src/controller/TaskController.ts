import { Request, Response } from "express";
import { TaskBusiness } from "../business/TaskBusiness";
import { TaskInputDTO } from "../model/post";


export class TaskController {
  constructor(private taskBusiness: TaskBusiness ) {}


  public createTask = async (req: Request, res: Response):Promise<void> => {
    try {
      const { id, photo, description, type,  created_at, authorId } = req.body;

      const postId: any = Date.now().toString()
     

      const input: TaskInputDTO = {
        id:postId,
        photo,
        description,
        type,
        created_at,
        authorId
      };

      await this.taskBusiness.createTask(input);

      res.status(201).send({ message: "Postagem criada com sucesso!" });
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
  }

  public getAllPosts = async (req: Request, res: Response) => {
    try {

   

      const tasks = await this.taskBusiness.getAllPosts()

      res.status(201).send({ tasks });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }
}