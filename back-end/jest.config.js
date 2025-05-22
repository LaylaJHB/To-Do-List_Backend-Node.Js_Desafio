module.exports = {
  roots: ["<rootDir>/tests"],
  transform: {
     "^.+\\.tsx?$": "ts-jest",
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  clearMocks: true,
};
