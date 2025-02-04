// jest.config.mjs
export default {
  testMatch: [
    "**/__tests__/**/*.test.mjs", // Matches your current structure
    "**/?(*.)+(spec|test).mjs"   // Optional: For other potential test file names
  ],
  moduleNameMapper: {
    '^/busneighbor/(.*)$': '<rootDir>/$1'
  }
};
