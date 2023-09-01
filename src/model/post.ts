export type task = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    created_at: Date,
    authorId: string
 }

 export interface TaskInputDTO {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    created_at: Date,
    authorId: string
  }
  
export interface TaskPostInputDTO {
   id: string

}

  export enum POST_TYPES {
   NORMAL = "normal",
   EVENT = "event"
}

  export type returnPostId = {
   id: string,
   photo: string,
   description: string,
   type: POST_TYPES,
   created_at: Date,
   authorId: string
}