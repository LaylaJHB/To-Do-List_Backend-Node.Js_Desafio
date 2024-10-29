import { CustomError, InvalidEmail, InvalidPassword } from "../error/CustomError";
import { UserInputDTO, LoginInputDTO } from "../model/user";
import { user } from "../model/user";
import { generateId } from "../services/idGenerator";
import { HashManager } from "../services/hashManager";
import { Authenticator } from "../services/authenticator";
import { UserRepository } from "./UserRepository";
import { UserNotFound } from "../error/UserErrors";
import { UserDatabase } from "../data/mySQL/UserDatabase";



export class UserBusiness {
   constructor(private userDatabase: UserRepository){}

  public createUser = async (input: UserInputDTO) => {
     try {

        const { name, email, password } = input
        if (
           !name ||
           !email ||
           !password
           ) {
              throw new CustomError(400,'Preencha os campos "name", "email" e "password"')
           }

        if(!email.includes("@")) {
            throw new InvalidEmail()
        }

        if(password.length <=6) {
           throw new InvalidPassword()
       }
           
           const id: string = generateId()

           const hashManager = new HashManager()
           const encryptedPassword = await hashManager.hash(input.password);
           
           const user: user = {
              id,
              name: input.name,
              email: input.email,
              password:encryptedPassword 
           }

           await this.userDatabase.insertUser(user)

           const token = Authenticator.generateToken({id})
           return token;
           
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

     if (password.length < 6) {
       throw new CustomError(
         422,
         "É necessário que a senha tenha pelo menos 6 caracteres."
       )
     }

     if (!email.includes("@")) {
       throw new InvalidEmail();
     }
     
     const user = await this.userDatabase.findByEmail(email)

     const hashManager = new HashManager()
     const passwordIsCorrect = hashManager.compare(password, user.password);
     
    
     

     if (!user) {
       throw new UserNotFound()
     }

     if(!passwordIsCorrect) {
       throw new InvalidPassword()
     }

     const token = Authenticator.generateToken({id: user.id})
     return token;
     
   } catch (error:any) {
     throw new CustomError(400, error.message);
   }
 }

 public getUserById = async (id: string) => {
   try {
     const userId = new UserDatabase();
     const result = await userId.getUserById(id);

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
}