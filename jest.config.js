// jest.config.js
module.exports = {
    verbose: true,
    bail: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageReporters: ['json', 'lcov', 'text', 'html'],
    // "coverageCollector": "jest-babel-istanbul",
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    testRegex: '(/Tests/.*|\\.(Test|Spec))\\.(ts|tsx|js)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/Mocks/FileMock.js',
        '\\.(css|sass|scss)$': 'identity-obj-proxy'
    }

};