import * as jwt from 'jsonwebtoken';
import { Unaunthorized } from '../error/CustomError';
import { AuthenticationData } from "../model/user";

export abstract class Authenticator {

    static generateToken({id}: AuthenticationData):string {
        const token = jwt.sign(
            {id},
            process.env.JWT_KEY as any,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
        return token;
    }

    static getToken(token: string):AuthenticationData {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as any
            ) as AuthenticationData
            return payload;
            
            
        } catch (error:any) {
            throw new Unaunthorized();
        }
    }
}