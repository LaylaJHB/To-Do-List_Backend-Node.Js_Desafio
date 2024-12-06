// /tests/mocks/UserDatabaseMock.ts
import { USER_ROLES } from "../../src/model/user";

export class UserDatabaseMock {
    private users: any[] = []; // Armazena os usuários mockados

    public async createUser(name: string, email: string, password: string, role: USER_ROLES): Promise<any> {
        const newUser = {
            id: `mocked-id-${this.users.length + 1}`,
            name,
            email,
            password,
            role,
        };
        this.users.push(newUser);
        return newUser;
    }

    public async getUserByEmail(email: string): Promise<any | null> {
        const user = this.users.find(user => user.email === email);
        return user || null;
    }
}
