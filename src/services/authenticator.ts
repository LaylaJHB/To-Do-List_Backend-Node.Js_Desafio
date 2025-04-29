import * as jwt from 'jsonwebtoken';
import { Unaunthorized } from '../error/CustomError';
import { AuthenticationData } from '../model/user';

export abstract class Authenticator {

  static generateToken({ id }: AuthenticationData): string {
    // fallback para testes/CI se a variável não estiver definida
    const jwtKey = process.env.JWT_KEY || 'default_jwt_secret';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

    return jwt.sign(
      { id },
      jwtKey,
      // @ts-ignore: aceita string para expiresIn no CI
      { expiresIn: jwtExpiresIn }
    );
  }

  static getToken(token: string): AuthenticationData {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_KEY || 'default_jwt_secret'
      ) as AuthenticationData;
      return payload;
    } catch {
      throw new Unaunthorized();
    }
  }
}


// import * as jwt from 'jsonwebtoken';
// import { Unaunthorized } from '../error/CustomError';
// import { AuthenticationData } from "../model/user";

// export abstract class Authenticator {

//     static generateToken({ id }: AuthenticationData): string {
//         const jwtKey = process.env.JWT_KEY;
//         const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

//         if (!jwtKey) {
//             throw new Error("JWT_KEY not defined in environment variables");
//         }

//         // @ts-ignore: require string expiresIn but we pass string like "1h"
//         const token = jwt.sign(
//             { id },               
//             jwtKey,               
//             { expiresIn: jwtExpiresIn }
//         );

//         return token;
//     }

//     static getToken(token: string): AuthenticationData {
//         try {
//             const payload = jwt.verify(
//                 token,
//                 process.env.JWT_KEY as string
//             ) as AuthenticationData;

//             return payload;
//         } catch (error: any) {
//             throw new Unaunthorized();
//         }
//     }
// }


// // import * as jwt from 'jsonwebtoken';
// // import { Unaunthorized } from '../error/CustomError';
// // import { AuthenticationData } from "../model/user";

// // export abstract class Authenticator {

// //     static generateToken({id}: AuthenticationData):string {
// //         const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
// //         const token = jwt.sign(
// //             {id},
// //             process.env.JWT_KEY as string,
// //             {expiresIn: process.env.JWT_EXPIRES_IN}
// //         )
// //         return token;
// //     }

// //     static getToken(token: string):AuthenticationData {
// //         try {
// //             const payload = jwt.verify(
// //                 token,
// //                 process.env.JWT_KEY as string
// //             ) as AuthenticationData
// //             return payload;
            
            
// //         } catch (error:any) {
// //             throw new Unaunthorized();
// //         }
// //     }
// // }