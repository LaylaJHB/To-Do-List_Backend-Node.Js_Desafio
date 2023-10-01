import { generateId } from "../services/idGenerator";
import { Authenticator } from "../services/authenticator";
import { UpdateTaskInputDTO, task, TaskInputDTO, UpdateTaskInput, STATUS_TYPES } from "../model/post";
import { CustomError} from "../error/CustomError";
import { TaskRepository } from "./TaskRepository";
import { TaskDatabase } from "../data/mySQL/TaskDatabase";

export class TaskBusiness {

  constructor(private taskDatabase: TaskRepository){}
  public createTask = async (input: TaskInputDTO, token: string) => {
    try {
      let { title, description, deadline, status } = input;
      

      if (!description) {
        throw new Error(
           'Erro: O campo "description" está vazio! Preencha a descrição da tarefa'
        );
      }



      if (!status) {
        status = STATUS_TYPES.PENDENTE
      }

      if (status != 'pendente' && status != 'em_andamento' && status != 'concluída') {
        throw new Error(
          'Erro de status. Preencha o "status" da tarefa como "pendente", "em_andamento" ou concluída"'
        );
      }

 
      const id: string = generateId();

    
      const authorId = Authenticator.getToken(token).id
  

      const task: task = {
        id,
        title,
        description,
        deadline,
        status,
        created_at: new Date(),
        authorId,
      }

      await this.taskDatabase.createTask(task)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };


  public searchPost = async (id: string) => {

    try {

      const task = new TaskDatabase()
      const result = await task.searchPost(id)

      return result

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    } 
  };


 
  public getAllPosts = async (): Promise<task[]> => {

    try {

      const task = new TaskDatabase()

      const result = await task.getAllPosts()

      return result;

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    } 
  };


  public deleteTaskById = async (id:string): Promise<void> => {
    try {
    
      await this.taskDatabase.deleteTaskById(id)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  };

  public updateTaskById = async (input: UpdateTaskInputDTO) => {

    try {

      const {id, title, description, deadline, status, created_at, authorId, token} = input;
      const updateTaskInput: UpdateTaskInput = {
        id,
        title,
        description,
        deadline,
        status, 
        created_at, 
        authorId
      }
      const {} = Authenticator.getToken(token)
      console.log(input)

      const taskDatabase = new TaskDatabase()
      const result = await taskDatabase.updateTaskById(updateTaskInput)

      return result

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    } 
  };

}  