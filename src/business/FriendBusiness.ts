import { generateId } from "../services/idGenerator";
import { friend, FriendInputDTO } from "../model/friend";
import { CustomError } from "../error/CustomError";
import { FriendRepository } from "./FriendRepository";

export class FriendBusiness {

  constructor(private friendDatabase: FriendRepository){}
  public createFriend = async (input: FriendInputDTO) => {
    try {
      const { id_user, id_friend } = input;

      if (!id_user) {
        throw new Error(
          '"id_user" e "id_friend" são obrigatórios'
        );
      }

      const id: string = generateId();

      
      const friend: friend = {
        id,
        id_user,
        id_friend
      }

      await this.friendDatabase.createFriend(friend)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

  public unFriend = async (id:string): Promise<void> => {
    try {
      
      await this.friendDatabase.unFriend(id)
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message)
    }
  }

}