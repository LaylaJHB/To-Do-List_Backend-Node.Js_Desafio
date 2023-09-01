import { task } from "../model/post"

export interface TaskRepository {
    createTask(task: task):Promise<void> 
    searchPost(id: string): Promise<any> 
}