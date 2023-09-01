import { BaseDatabase } from "./BaseDatabase";
import { friend, unfriend } from "../../model/friend";
import { CustomError } from "../../error/CustomError";
import { FriendRepository } from "../../business/FriendRepository";


export class FriendDatabase extends BaseDatabase implements FriendRepository {
   static unFriend(unfriend: unfriend) {
     throw new Error("Method not implemented.");
   }



   public createFriend = async (friend: friend):Promise<any> => {
      try {
      await FriendDatabase.connection('labook_friends')
         .insert({
            id: friend.id,
            id_user: friend.id_user,
            id_friend: friend.id_friend
         })
         .into('labook_friends');
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
   };

   
   public unFriend = async(id:string): Promise<void> => {


   let input = {}
      try {
         
         await FriendDatabase.connection('labook_friends')
         .delete()
         .where({id});
         

      }  catch (error:any) {
         throw new CustomError(error.statusCode, error.message);
      }
   }; 
}   