import { UserRepository } from "../../business/UserRepository";
import { CustomError } from "../../error/CustomError";
import { user } from "../../model/user";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase implements UserRepository {

  public insertUser = async (user: user):Promise<void> => {
    try {
      await UserDatabase.connection
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password
        })
        .into("to_do_list_users");
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public getUsers = async (): Promise<user[]> => {
    try {
      const allUsers = await UserDatabase.connection
        .select()
        .from("to_do_list_users");

      return allUsers;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public findByEmail = async (email: string) => {
    try {
      const result = await UserDatabase.connection
      .select()
      .where({ email })
      .into("to_do_list_users");
      
      return result[0]

    } catch (error:any) {
      throw new CustomError(400, error.message || error.sqlMessage);
    }
  };

}