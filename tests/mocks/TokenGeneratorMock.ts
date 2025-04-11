// /tests/mocks/TokenGeneratorMock.ts
export class TokenGeneratorMock {
  public generate = (id: string): string => {
      return `mocked-token-for-${id}`; // Retorna um token mockado
  };
}
