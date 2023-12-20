export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/utils/fileMock.ts',
    '^@(components|assets|styles|contexts|hooks|utils|api|pages|constants)/(.+)$':
      '<rootDir>/src/$1/$2',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
