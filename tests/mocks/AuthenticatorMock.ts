// tests/mocks/AuthenticatorMock.ts
export abstract class AuthenticatorMock {
  static generateToken({ id }: { id: string }): string {
    return `mock-token-${id}`;
  }

  static getToken(token: string): { id: string } {
    const id = token.replace("mock-token-", "");
    return { id };
  }
}
