// /tests/mocks/HashGeneratorMock.ts
// export class HashGeneratorMock {
//   public hash = async (password: string): Promise<string> => {
//       return `hashed_${password}`; // Simula um hash simples
//   };

//   public compare = (password: string, hash: string): boolean => {
//       return hash === `hashed_${password}`; // Simula a comparação de hash
//   };
// }

// /tests/mocks/HashGeneratorMock.ts
// /tests/mocks/HashGeneratorMock.ts


// tests/mocks/HashGeneratorMock.ts

export class HashGeneratorMock {
  
  async hash(password: string): Promise<string> {
    return "hashed-password";
  }

  compare(password: string, hash: string): boolean {
    return (
      (password === "fulano123" && hash === "hash-mock-fulano") ||
      (password === "astrodev99" && hash === "hash-mock-astrodev") ||
      (password === "1234567" && hash === "hashed-password")
    );
  }

}



