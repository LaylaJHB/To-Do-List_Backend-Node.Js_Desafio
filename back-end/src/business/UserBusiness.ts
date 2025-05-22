import { CustomError, InvalidEmail, InvalidPassword } from "../error/CustomError";
import { UserInputDTO, LoginInputDTO, UpdateUserInput, UpdateUserInputDTO } from "../model/user";
import { user } from "../model/user";
import { IdGenerator } from "../services/idGenerator";
import { HashManager } from "../services/hashManager";
import { Authenticator } from "../services/authenticator";
import { UserRepository } from "./UserRepository";
import { UserNotFound } from "../error/UserErrors";
import { UserDatabase } from "../data/mySQL/UserDatabase";
import logger from "../utils/logger";




export class UserBusiness {
   constructor(

      private userDatabase: UserRepository,
      private idGenerator: IdGenerator,
      private authenticator: typeof Authenticator, // << Mude aqui
      private hashManager: HashManager

    
    // private userDatabase: UserRepository,
    // private idGenerator: IdGenerator,
    // private authenticator: Authenticator,
    // private hashManager: HashManager
  ){}

  public createUser  = async (input: UserInputDTO) => {
     try {
      logger.info(`Iniciando signup para email: ${input.email}`);

        const { name, email, password } = input
        if (
           !name ||
           !email ||
           !password
           ) {
            throw new CustomError(422, "Missing input");
           }

        if(!email.includes("@")) {
            throw new InvalidEmail()
        }

        if(password.length <=6) {
           throw new InvalidPassword()
       }
           
           const id: string = this.idGenerator.generate()

           const hashManager = new HashManager()
           const encryptedPassword = await hashManager.hash(input.password);
           
           const user: user = {
             id,
             name: input.name,
             email: input.email,
             password: encryptedPassword,
             role: ""
           }

           await this.userDatabase.insertUser(user)

           const token = Authenticator.generateToken({id})
           return {
            id,
            name: input.name,
            email: input.email,
            token
          };
           
        } catch (error: any) {
           throw new CustomError(error.statusCode, error.message)
        }
  }


  public getUsers = async () => {

     try {
        
        return await this.userDatabase.getUsers();
        
     } catch (error: any) {
        throw new CustomError(error.statusCode, error.message)
     }
  }

  public login = async (input: LoginInputDTO) => {
   try {
     const {email, password} = input;
     if (!email || !password) {
       throw new CustomError(
         422, 
         "Senha e/ou email inválidos."
         )
     }

     if (password.length < 7) {
       throw new CustomError(
         422,
         "É necessário que a senha tenha pelo menos 7 caracteres."
       )
     }

     if (!email.includes("@")) {
       throw new InvalidEmail();
     }
     
     const user = await this.userDatabase.findByEmail(email)

     if (!user) {
      throw new UserNotFound();
    }

     const passwordIsCorrect = await this.hashManager.compare(password, user.password);

     if (!user) {
       throw new UserNotFound()
     }

     if(!passwordIsCorrect) {
       throw new InvalidPassword()
     }

     const token = Authenticator.generateToken({id: user.id})
     return { token };
     
   } catch (error:any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, "Unexpected error");
   }
 }

 public getUserById = async (id: string) => {
   try {
     const userId = new UserDatabase();
     const result = await userId.getUserById(id);

     if (!result) {
      throw new UserNotFound();
    }

     return result;
   } catch (error: any) {
     throw new CustomError(error.statusCode, error.message);
   }
 };

 public deleteUserById = async (id: string, token: string): Promise<void> => {
   try {
     const {} = Authenticator.getToken(token);
     //  console.log(input)

     const userDatabase = new UserDatabase();

     await userDatabase.deleteUserById(id);
   } catch (error: any) {
     throw new CustomError(error.statusCode, error.message);
   }
 };

 public updateUserById = async (input: UpdateUserInputDTO) => {

  try {
    const { id, name, email, password, token } = input;

    const updateUserInput: UpdateUserInput = {
      id,
      name,
      email,
      password,
    };

    const {} = Authenticator.getToken(token);

    const userDatabase = new UserDatabase();
    const result = await userDatabase.updateUserById(updateUserInput);

    return result;

  } catch (error: any) {
    throw new CustomError(error.statusCode, error.message);
  }
 };
 
}


function generateId(): string {
  throw new Error("Function not implemented.");
}
