module.exports = {
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/*(*.)+(spec|test).[tj]s?(x)', '**/*.test.mjs'],
  testPathIgnorePatterns: ['/node_modules/', '/.vscode/'],
  transform: { '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest' }
};
