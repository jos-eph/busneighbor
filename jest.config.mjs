// jest.config.mjs
export default {
  testMatch: [
    "**/__tests__/**/*.test.mjs"
  ],
  moduleNameMapper: {
    '^/busneighbor/(.*)$': '<rootDir>/$1'
  }
};
