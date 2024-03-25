/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "C:\\Users\\Joshua\\AppData\\Local\\Temp\\jest",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    './src/middlwares/**',
    './src/controllers/**',
    './src/routes/**',
    './src/utils/**',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},
};

export default config;
