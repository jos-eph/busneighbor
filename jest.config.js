module.exports = {
  moduleNameMapper: {
    '^/(.*)$': '<rootDir>/$1', // Map root paths to the project root
  },
  testMatch: ['**/*.test.mjs'],
  testPathIgnorePatterns: ['/node_modules/', '/.vscode/'],
  transform: { '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest' }
};
