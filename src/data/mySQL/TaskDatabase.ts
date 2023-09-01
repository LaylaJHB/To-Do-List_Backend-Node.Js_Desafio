import { BaseDatabase } from "./BaseDatabase";
import { task } from "../../model/post";
import { CustomError } from "../../error/CustomError";
import { TaskRepository } from "../../business/TaskRepository";


export class TaskDatabase extends BaseDatabase implements TaskRepository {



   public createTask = async (task: task):Promise<any> => {
      try {
      await TaskDatabase.connection('to_do_list_tasks')
         .insert({
            id: task.id,
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            created_at: task.created_at,
            author_id: task.authorId
         })
         .into('to_do_list_tasks');
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
   };


   public searchPost = async(id: string): Promise<task[]> => {
      try {
         const returnPostId = await TaskDatabase.connection
         .where({id})
         .into('to_do_list_tasks')

         return returnPostId;

      }  catch (error:any) {
         throw new CustomError(error.statusCode, error.message);
      }
   };


   public getAllPosts = async(): Promise<task[]> => {
      try {
         const returnAllPosts = await TaskDatabase.connection
         .select('*')
         .into('to_do_list_tasks')

         return returnAllPosts;

      }  catch (error:any) {
         throw new CustomError(error.statusCode, error.message);
      }
   };

}   