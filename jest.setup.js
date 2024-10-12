// jest.setup.js
if (process.env.TEST_CONFIG_ID) {
  const testConfigId = process.env.TEST_CONFIG_ID;
  jest.setTimeout(30000); // Increase timeout for specific tests if needed
  console.log(`Running tests for config ID: ${testConfigId}`);
}
