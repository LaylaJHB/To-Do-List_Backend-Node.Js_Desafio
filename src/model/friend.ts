export type friend = {
    id: string,
    id_user: string,
    id_friend: string
 }

 export interface FriendInputDTO {
   id_user: string,
   id_friend: string
  }
  
export type unfriend = {
    id: string,
    id_user: string,
    id_friend: string
 }
