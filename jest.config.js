module.exports = {
  testMatch: ['**/*.test.mjs'],
  testPathIgnorePatterns: ['/node_modules/', '/.vscode/'],
  transform: { '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest' }
};
