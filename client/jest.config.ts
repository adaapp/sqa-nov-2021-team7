export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(png)$": "<rootDir>/mocks/fileMocks.tsx"
    }
};
