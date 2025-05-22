import { user, LoginInputDTO, UserInputDTO, UpdateUserInput } from "../model/user"

export interface UserRepository {
    insertUser(user: user):Promise<void> 
    getUsers(): Promise<user[]> 
    findByEmail(email: string): Promise<any>
    updateUserById(user: UpdateUserInput, token: string): Promise<any>
}