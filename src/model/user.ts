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