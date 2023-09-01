import { Request, Response } from "express";
import { FriendBusiness } from "../business/FriendBusiness";
import { FriendInputDTO } from "../model/friend";


export class FriendController {
  constructor(private friendBusiness: FriendBusiness ) {}


  public createFriend = async (req: Request, res: Response):Promise<void> => {
    try {
      const { id_user, id_friend} = req.body;


      const input: FriendInputDTO = {
        id_user,
        id_friend
      };


      await this.friendBusiness.createFriend(input);

      res.status(201).send({ message: "Amigo criado com sucesso!" });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public unFriend = async (req: Request, res: Response) => {
    try {

      const { id_user, id_friend} = req.body;

      const input: FriendInputDTO = {
        id_user,
        id_friend
      };

    
      await this.friendBusiness.unFriend(req.params.id)

      res.status(201).send({ message: "Amizade desfeita com sucesso!" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

}