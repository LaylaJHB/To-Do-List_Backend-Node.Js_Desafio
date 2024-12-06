export type user = {
   id: string,
   name: string,
   email: string,
   password: string
}

 export interface UserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string
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

export const USER_ROLES = {
   NORMAL: "normal",
   ADMIN: "admin",
}
