export default {
  roots: ["<rootDir>/tests"],
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "<rootDir>/tests/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov"],
  moduleNameMapper: {
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1"
  },
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest"
  },
};
