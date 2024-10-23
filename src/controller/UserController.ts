import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO, LoginInputDTO } from "../model/user";
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

}
