import { generateId } from "../services/idGenerator";
import { STATUS_TYPES, task, TaskInputDTO } from "../model/post";
import { CustomError} from "../error/CustomError";
import { TaskRepository } from "./TaskRepository";
import { TaskDatabase } from "../data/mySQL/TaskDatabase";

export class TaskBusiness {

  constructor(private taskDatabase: TaskRepository){}
  public createTask = async (input: TaskInputDTO) => {
    try {
      const { title, description, deadline, status, created_at, authorId } = input;
      

      if (!description) {
        throw new Error(
           'Erro: O campo "description" está vazio! Preencha a descrição da tarefa'
        );
      }


      if (!authorId) {
        throw new Error(
          'Erro: O campo "authorId" está vazio!\nAdicione o ID do autor da tarefa para criar uma nova tarefa'
        );
      }

      if (!status) {
        throw new Error(
          'O status está vazio. Preencha "status" com "normal" ou "event"'
        );
      }

      if (status != 'pendente' && status != 'em_andamento' && status != 'concluída') {
        throw new Error(
          'Erro de status. Preencha o "status" da tarefa como "pendente", "em_andamento" ou concluída"'
        );
      }

 
      const id: string = generateId();

      
      const task: task = {
        id,
        title,
        description,
        deadline,
        status,
        created_at,
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
}  