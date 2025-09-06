module.exports = {
    // ... other Jest configuration options
    testEnvironment: 'jsdom', // Or a custom environment that provides TextDecoder
    setupFilesAfterEnv: ['./setup.js'], // Replace with your polyfill or setup file path
};