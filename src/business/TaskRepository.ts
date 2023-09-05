import { task, UpdateTaskInput, UpdateTaskInputDTO } from "../model/post"

export interface TaskRepository {
    createTask(task: task):Promise<void> 
    searchPost(id: string): Promise<any> 
    deleteTaskById(id:string): Promise<void>
    updateTaskById(task: UpdateTaskInput, input: UpdateTaskInputDTO): Promise<void>
}