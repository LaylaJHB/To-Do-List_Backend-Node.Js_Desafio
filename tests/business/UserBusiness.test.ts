import { UserBusiness } from "../../src/business/UserBusiness";
import { CustomError } from "../../src/error/CustomError";
import { USER_ROLES } from "../../src/model/user";
import { HashGeneratorMock } from "../mocks/HashGeneratorMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { HashManager } from "../../src/services/hashManager";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";

jest.mock("../../src/data/mySQL/UserDatabase", () =>
  require("../mocks/userDatabaseMockForNew")
);

const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    AuthenticatorMock, // sem `new`, pois é uma classe estática
    new HashGeneratorMock() as unknown as HashManager 
  )

// Teste com o mock diretamente
//const userBusiness = new UserBusiness(new UserRepositoryMock());
describe("[INICIA TESTES UNITÁRIOS NA CAMADA BUSINESS]", () => {
describe("Teste 01: Criar usuário (createUser)", () => {
    test("should return an error when the name is empty", async () => {
        expect.assertions(3);
        try {
          await userBusiness.createUser({
            id: "mock-01-id",
            name: "", 
            email: "email@email.com", 
            password: "1234567", 
            role: USER_ROLES.NORMAL
        });
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.statusCode).toBe(422);
            expect(error.message).toBe("Missing input");
        }
    });

    test("should return an error when the email is empty", async () => {
      expect.assertions(3);
      try {
          await userBusiness.createUser({
            id: "mock-02-id",
            name: "John Doe", 
            email: "", 
            password: "1234567", 
            role: USER_ROLES.NORMAL
          })

      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(422);
          expect(error.message).toBe("Missing input");
      }
  });

  test("should return an error when the password is empty", async () => {
      expect.assertions(3);
      try {
          await userBusiness.createUser({
            id: "mock-03-id",
            name: "John Doe", 
            email: "email@email.com", 
            password: "", 
            role: USER_ROLES.NORMAL
          })
      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(422);
          expect(error.message).toBe("Missing input");
      }
  });

  test("should create a user successfully when valid inputs are provided", async () => {
      const response = await userBusiness.createUser({
        id: "mock-04-id",
        name: "John Doe", 
        email: "email@email.com", 
        password: "1234567", 
        role: USER_ROLES.NORMAL
      })
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name", "John Doe");
      expect(response).toHaveProperty("email", "email@email.com");
  });
});
});

describe("Teste 02: Login - login", () => {
  test("should return an error when the email is not registered", async () => {
      expect.assertions(3);
      try {
// Exemplo de chamada de login com o objeto LoginInputDTO
await userBusiness.login({
  email: "not@found.com",
  password: "any-password",
});
      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(404);
          expect(error.message).toBe("Usuário não encontrado");
      }
  });

  test("should return an error when the password is incorrect", async () => {
      expect.assertions(3);
      try {
// Exemplo de chamada de login com o objeto LoginInputDTO
await userBusiness.login({
  email: "fulano@email.com",
  password: "senha-incorreta"
});
      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(400);
          expect(error.message).toBe("Senha inválida");
      }
  });

  test("should log in successfully when valid credentials are provided", async () => {
      const response = 
      await userBusiness.login({
          email: "fulano@email.com",
          password: "fulano123",
      });
      
      expect(response).toHaveProperty("token");
  });
});

describe("Teste 03: getUsers", () => {
  test("should return all users", async () => {
    const response = await userBusiness.getUsers();
    expect(response.length).toBeGreaterThanOrEqual(2);
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Fulano" }),
        expect.objectContaining({ name: "Astrodev" })
      ])
    );
  });
});


// getUserById
describe("Teste 04: getUserById", () => {
  test("should return the user when ID exists", async () => {
    const response = await userBusiness.getUserById("id-mock-fulano");

    expect(response).toEqual({
      id: "id-mock-fulano",
      name: "Fulano",
      email: "fulano@email.com",
      password: "hash-mock-fulano", 
      role: USER_ROLES.NORMAL,
      created_at: expect.any(String)
    });
  });

  test("should throw error if user is not found", async () => {
    expect.assertions(2);
    try {
      await userBusiness.getUserById("non-existent-id");
    } catch (error: any) {
      expect(error).toBeInstanceOf(CustomError);
      expect(error.message).toBe("Usuário não encontrado");
    }
  });
});