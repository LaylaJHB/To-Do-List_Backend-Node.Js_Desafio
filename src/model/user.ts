export type user = {
   id: string,
   name: string,
   email: string,
   password: string,
   role: string
}

 export interface UserInputDTO {
    name: string,
    email: string,
    password: string
    role: USER_ROLES;
  }

  
export interface AuthenticationData {
   id: string
}

export interface LoginInputDTO {
   email: string,
   password: string
}

export interface login {
   email: string,
   password: string
 }

 export interface deleteUserInputDTO {
   id: string
  }

  export interface UpdateUserInputDTO {
   id: string,
   name: string,
   email: string,
   password: string
   token: string
  }

  export interface UpdateUserInput {
   id: string,
   name: string,
   email: string,
   password: string
  }

export enum USER_ROLES {
   NORMAL = "normal",
   ADMIN = "admin",
}

export interface SignupInputDTO {
   name: string,
   email: string,
   password: string
 }
 
 export interface SignupOutputDTO {
   message: string,
   token: string
 }

 export interface UserDB {
   id: string,
   name: string,
   email: string,
   password: string,
   role: USER_ROLES,
   created_at: string
 }
 