import { UserBusiness } from "../../src/business/UserBusiness";
import { CustomError } from "../../src/error/CustomError";
import { USER_ROLES } from "../../src/model/user";
import { HashGeneratorMock } from "../mocks/HashGeneratorMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "../mocks/TokenGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { UserRepositoryMock } from "../mocks/UserRepositoryMock";
import { HashManager } from "../../src/services/hashManager";


const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenGeneratorMock(),
    new HashGeneratorMock() as unknown as HashManager 
  )

// Teste com o mock diretamente
//const userBusiness = new UserBusiness(new UserRepositoryMock());
describe("Testando signup", () => {
describe("UserBusiness - signup", () => {
    test("should return an error when the name is empty", async () => {
        expect.assertions(3);
        try {
          await userBusiness.signup({
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
          await userBusiness.signup({
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
          await userBusiness.signup({
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
      const response = await userBusiness.signup({
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

describe("UserBusiness - login", () => {
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
      expect.assertions(2);
      try {
// Exemplo de chamada de login com o objeto LoginInputDTO
await userBusiness.login({
  email: "fulano@email.com",
  password: "senha-incorreta"
});
      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(401);
          expect(error.message).toBe("invalidPassword");
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