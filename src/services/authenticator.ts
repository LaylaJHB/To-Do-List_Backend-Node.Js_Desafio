import * as jwt from 'jsonwebtoken';
import { Unaunthorized } from '../error/CustomError';
import { AuthenticationData } from "../model/user";

export abstract class Authenticator {

    static generateToken({ id }: AuthenticationData): string {
        const jwtKey = process.env.JWT_KEY;
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";

        if (!jwtKey) {
            throw new Error("JWT_KEY not defined in environment variables");
        }

        const token = jwt.sign(
            { id },               // payload correto (AuthenticationData)
            jwtKey,               // chave garantida (string)
            { expiresIn: jwtExpiresIn } // expiresIn garantido (string)
        );

        return token;
    }

    static getToken(token: string): AuthenticationData {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            ) as AuthenticationData;

            return payload;
        } catch (error: any) {
            throw new Unaunthorized();
        }
    }
}


// import * as jwt from 'jsonwebtoken';
// import { Unaunthorized } from '../error/CustomError';
// import { AuthenticationData } from "../model/user";

// export abstract class Authenticator {

//     static generateToken({id}: AuthenticationData):string {
//         const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
//         const token = jwt.sign(
//             {id},
//             process.env.JWT_KEY as string,
//             {expiresIn: process.env.JWT_EXPIRES_IN}
//         )
//         return token;
//     }

//     static getToken(token: string):AuthenticationData {
//         try {
//             const payload = jwt.verify(
//                 token,
//                 process.env.JWT_KEY as string
//             ) as AuthenticationData
//             return payload;
            
            
//         } catch (error:any) {
//             throw new Unaunthorized();
//         }
//     }
// }