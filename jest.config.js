module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular',
  },

  moduleFileExtensions: ['ts', 'html', 'js', 'json'],

  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],

  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },

  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.html$',
    },
  },

  collectCoverage: true,
  coverageDirectory: 'coverage',
};