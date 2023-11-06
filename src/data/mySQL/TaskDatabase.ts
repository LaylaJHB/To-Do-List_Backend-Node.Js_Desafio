import { BaseDatabase } from "./BaseDatabase";
import { STATUS_TYPES, UpdateTaskInput, UpdateTaskInputDTO, task } from "../../model/post";
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



   public getAllPosts = async(page: number): Promise<task[]> => {
      try {
         const offset = (page -1) * 2
         // page =1, offset = 0
         // page =2, offset = 2
         // page =3, offset = 4
         // page =4, offset = 6
         // page 5, offset = 8
         

         const returnAllPosts = await TaskDatabase.connection
         .select ('*')
         .into('to_do_list_tasks')
         .limit (2)
         .offset (offset)



         return returnAllPosts;

      }  catch (error:any) {
         throw new CustomError(error.statusCode, error.message);
      }
   };

   


public deleteTaskById = async(id:string): Promise<void> => {


   let input = {}
      try {
         
         await TaskDatabase.connection('to_do_list_tasks')
         .delete()
         .where({id});
         

      }  catch (error:any) {
         throw new CustomError(error.statusCode, error.message);
      }
   }; 

   public updateTaskById = async(task: UpdateTaskInput): Promise<void> => {

         try {  

            await TaskDatabase.connection ('to_do_list_tasks')
            .update(task)
            .where({id: task.id}); // query builder
   
         }  catch (error:any) {
            throw new CustomError(error.statusCode, error.message);
         }
      }; 
} 






/*          await TaskDatabase.connection. raw (`

            update to_do_list_tasks
            set description = "${task.description}"

            where id = "${task.id}"

            `
            )
*/     

/*           await TaskDatabase.connection ('to_do_list_tasks')
            .update({ description: task.description })
            .where("id", "=", task.id);
*/          
