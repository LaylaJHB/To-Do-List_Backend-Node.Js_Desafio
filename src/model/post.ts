export type task = {
    id: string,
    title: string,
    description: string,
    deadline: string,
    status: STATUS_TYPES,
    created_at: Date,
    authorId: string
 }

 export interface TaskInputDTO {
    id: string,
    title: string,
    description: string,
    deadline: string,
    status: STATUS_TYPES,
    created_at: Date,
    authorId: string
  }
  
export interface TaskPostInputDTO {
   id: string

}

  export enum STATUS_TYPES {
   PENDENTE = "pendente",
   EM_ANDAMENTO = "em_andamento",
   CONCLUÍDA = "concluída"
}

  export type returnPostId = {
   id: string,
   title: string,
   description: string,
   deadline: string,
   status: STATUS_TYPES,
   created_at: Date,
   authorId: string
}

export type deleteTaskById = {
   id: string
}

export interface deleteTaskInputDTO {
   id: string
  }

export type updateTaskById = {
   id: string,
   title: string,
   description: string,
   deadline: string,
   status: STATUS_TYPES,
   created_at: Date,
   authorId: string
}

export interface UpdateTaskInputDTO {
   id: string,
   title: string,
   description: string,
   deadline: string,
   status: STATUS_TYPES,
   created_at: Date,
   authorId: string,
   token: string
}

export interface UpdateTaskInput {
   id: string,
   title: string,
   description: string,
   deadline: string,
   status: STATUS_TYPES,
   created_at: Date,
   authorId: string
}

export interface AuthenticationData {
   id: string
}