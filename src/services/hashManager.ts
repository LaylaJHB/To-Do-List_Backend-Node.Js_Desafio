import * as bcrypt from 'bcryptjs'

export class HashManager {
    public hash = async (s: string): Promise<string> => {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const encryptedPpassword = await bcrypt.hash(s, salt)

        return encryptedPpassword
    };
}