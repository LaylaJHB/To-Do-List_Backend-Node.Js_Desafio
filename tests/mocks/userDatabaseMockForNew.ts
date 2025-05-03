import { USER_ROLES, UserDB, UpdateUserInput } from "./../../src/model/user";

const users: UserDB[] = [
  {
    id: "id-mock-fulano",
    name: "Fulano",
    email: "fulano@email.com",
    password: "hash-mock-fulano",
    created_at: new Date().toISOString(),
    role: USER_ROLES.NORMAL
  },
  {
    id: "id-mock-astrodev",
    name: "Astrodev",
    email: "astrodev@email.com",
    password: "hash-mock-astrodev",
    created_at: new Date().toISOString(),
    role: USER_ROLES.ADMIN
  }
];

export class UserDatabase {
  private users: UserDB[] = [...users];

  async insertUser(user: UserDB): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<UserDB | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async getUserById(id: string): Promise<UserDB | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getUsers(): Promise<UserDB[]> {
    return this.users;
  }

  async updateUserById(update: UpdateUserInput): Promise<string> {
    const index = this.users.findIndex(u => u.id === update.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...update };
      return "Usuário atualizado com sucesso";
    }
    throw new Error("Usuário não encontrado");
  }

  async deleteUserById(id: string): Promise<void> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return;
    }
    throw new Error("Usuário não encontrado");
  }
}
