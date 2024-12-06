import { UserRepository } from "../../src/business/UserRepository";
import { user } from "../../src/model/user";

// Mock de UserRepository
export class UserRepositoryMock implements UserRepository {
  private users: user[] = [];  // Simula um banco de dados de usuários

  async insertUser(user: user): Promise<void> {
   this.users.push(user);  // Adiciona o usuário ao "banco de dados" (array)
  }
  
  async getUsers(): Promise<user[]> {
      // Simula a obtenção de usuários
      return [];
  }
  
  async findByEmail(email: string): Promise<any> {
      // Simula a busca por email
      return { email, password: "hashedPassword", id: "123" };
  }
}
