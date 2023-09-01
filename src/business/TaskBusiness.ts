import { generateId } from "../services/idGenerator";
import { task, TaskInputDTO } from "../model/post";
import { CustomError} from "../error/CustomError";
import { TaskRepository } from "./TaskRepository";
import { TaskDatabase } from "../data/mySQL/TaskDatabase";

export class TaskBusiness {

  constructor(private taskDatabase: TaskRepository){}
  public createTask = async (input: TaskInputDTO) => {
    try {
      const { photo, description, type, created_at, authorId } = input;
      

      if (!description) {
        throw new Error(
           'Erro: O campo "description" está vazio! Preencha a descrição da postagem'
        );
      }

      if (!photo) {
        throw new Error(
          'Erro: O campo "photo" está vazio. Adicione uma foto para criar uma postagem'
        );
      }

      if (!authorId) {
        throw new Error(
          'Erro: O campo "authorId" está vazio!\nAdicione o ID do autor da postagem para criar uma postagem'
        );
      }

      if (!type) {
        throw new Error(
          'O tipo está vazio. Preencha "type" com "normal" ou "event"'
        );
      }

      if (type != 'normal' && type != 'event') {
        throw new Error(
          'Erro de tipo. Preencha "type" com "normal" ou "event""'
        );
      }

 
      const id: string = generateId();

      
      const task: task = {
        id,
        photo,
        description,
        type,
        created_at,
        authorId,
      }

      await this.taskDatabase.createTask(task)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }


  public searchPost = async (id: string) => {

    try {

      const task = new TaskDatabase()
      const result = await task.searchPost(id)

      return result

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    } 
  }

  
  public getAllPosts = async (): Promise<task[]> => {

    try {

      const task = new TaskDatabase()

      const result = await task.getAllPosts()

      return result;

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    } 
  }
}