// /tests/mocks/HashGeneratorMock.ts
export class HashGeneratorMock {
  public generateHash = (password: string): string => {
      return `hashed_${password}`; // Simula um hash simples
  };

  public compareHash = (password: string, hash: string): boolean => {
      return hash === `hashed_${password}`; // Simula a comparação de hash
  };
}
