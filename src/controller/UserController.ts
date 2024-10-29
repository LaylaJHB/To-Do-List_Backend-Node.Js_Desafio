import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO, LoginInputDTO, deleteUserInputDTO } from "../model/user";
import { data } from "jquery";

export class UserController {
  constructor(private userBusiness: UserBusiness ) {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const { id, name, email, password } = req.body;

      const input: UserInputDTO = {
        id,
        name,
        email,
        password
      };
      
      const token = await this.userBusiness.createUser(input);

      res.status(201).send({ message: "Usuário criado!", token: token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
    
  };

  public getUsers = async (req: Request, res: Response):Promise<void> => {
    try {
     
       const name = 32
      // console.log([] instanceof Array)

      console.assert(name==undefined || typeof name == "string", "Validação de filtro name")

       const users = await this.userBusiness.getUsers()

       res.status(201).send(users)
    } catch (error: any) {
       res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  }

  
  public login = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      const password = req.body.password as string;

      const input: LoginInputDTO = {
        email,
        password
      }

      const token = await this.userBusiness.login(input)

      res.status(200).send({token})

    } catch (error:any) {
      res.status(400).send(error.message);
    }
  }

  public getUserById = async (req: Request, res: Response) => {
    try {

   
      const id: string = req.params.id

     
      const userId = await this.userBusiness.getUserById(id)

      res.status(201).send({ userId });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };

  public deleteUserById = async (req: Request, res: Response) => {
    try {

      const { id } = req.body;
      const token = req.headers.authorization

      const input: deleteUserInputDTO = {
        id
      };
    
      await this.userBusiness.deleteUserById(req.params.id, token as string)

      res.status(201).send({ message: "Tarefa excluída com sucesso!" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
    }
  };

}
