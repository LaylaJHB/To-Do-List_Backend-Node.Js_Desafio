import { user, LoginInputDTO, UserInputDTO } from "../model/user"

export interface UserRepository {
    insertUser(user: user):Promise<void> 
    getUsers(): Promise<user[]> 
    findByEmail(email: string): Promise<any>
}