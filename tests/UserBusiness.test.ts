import { UserBusiness } from "../src/business/UserBusiness";
import { CustomError } from "../src/error/CustomError";
import { USER_ROLES } from "../src/model/user";
import { HashGeneratorMock } from "./mocks/HashGeneratorMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/TokenGeneratorMock";
import { UserDatabaseMock } from "./mocks/UserDatabaseMock";
import { UserRepositoryMock } from "./mocks/UserRepositoryMock";

// Teste com o mock diretamente
const userBusiness = new UserBusiness(new UserRepositoryMock());


describe("UserBusiness - signup", () => {
    test("should return an error when the name is empty", async () => {
        expect.assertions(3);
        try {
          await userBusiness.signup("John Doe", "email@email.com", "123456", USER_ROLES.NORMAL);
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.statusCode).toBe(422);
            expect(error.message).toBe("Missing input");
        }
    });

    test("should return an error when the email is empty", async () => {
      expect.assertions(3);
      try {
          await userBusiness.signup("John Doe", "", "123456", USER_ROLES.NORMAL);
      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(422);
          expect(error.message).toBe("Missing input");
      }
  });

  test("should return an error when the password is empty", async () => {
      expect.assertions(3);
      try {
          await userBusiness.signup("John Doe", "email@email.com", "", USER_ROLES.NORMAL);
      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(422);
          expect(error.message).toBe("Missing input");
      }
  });

  test("should create a user successfully when valid inputs are provided", async () => {
      const response = await userBusiness.signup("John Doe", "email@email.com", "123456", USER_ROLES.NORMAL);
      expect(response).toHaveProperty("id");
      expect(response).toHaveProperty("name", "John Doe");
      expect(response).toHaveProperty("email", "email@email.com");
  });
});

describe("UserBusiness - login", () => {
  test("should return an error when the email is not registered", async () => {
      expect.assertions(3);
      try {
// Exemplo de chamada de login com o objeto LoginInputDTO
await userBusiness.login({
  email: "email@email.com",
  password: "wrongpassword",
});
      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(404);
          expect(error.message).toBe("User not found");
      }
  });

  test("should return an error when the password is incorrect", async () => {
      expect.assertions(3);
      try {
// Exemplo de chamada de login com o objeto LoginInputDTO
await userBusiness.login({
  email: "email@email.com",
  password: "wrongpassword",
});
      } catch (error: any) {
          expect(error).toBeInstanceOf(CustomError);
          expect(error.statusCode).toBe(401);
          expect(error.message).toBe("Invalid credentials");
      }
  });

  test("should log in successfully when valid credentials are provided", async () => {
      const response = 
      await userBusiness.login({
          email: "email@email.com",
          password: "wrongpassword",
      });
      
      expect(response).toHaveProperty("token");
  });
});