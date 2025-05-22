// /tests/mocks/UserDatabaseMock.ts
import { BaseDatabase } from "../../src/data/mySQL/BaseDatabase";
import { UpdateUserInput, USER_ROLES, UserDB } from "../../src/model/user";

const usersMock: UserDB[] = [
  {
    id: "id-mock-fulano",
    name: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano", // senha = "fulano123"
    created_at: new Date().toISOString(),
    role: USER_ROLES.NORMAL
  },
  {
    id: "id-mock-astrodev",
    name: "Astrodev",
    email: "astrodev@email.com",
    password: "hash-mock-astrodev", // senha = "astrodev99"
    created_at: new Date().toISOString(),
    role: USER_ROLES.ADMIN
  }
];

export class UserDatabaseMock extends BaseDatabase {
  private users: UserDB[];

  constructor() {
    super();
    this.users = [...usersMock]; // começa com usuários mockados
  }

  public async insertUser(newUserDB: UserDB): Promise<void> {
    this.users.push(newUserDB);
  }

  public async findByEmail(email: string): Promise<UserDB | null> {
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  public async getUserById(id: string): Promise<UserDB | null> {
    const user = this.users.find(u => u.id === id);
    return user || null;
  }

  public async getUsers(): Promise<UserDB[]> {
    return this.users;
  }

  async updateUserById(user: UpdateUserInput, token: string): Promise<any> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
    }
  }

  public async deleteUserById(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }
}
