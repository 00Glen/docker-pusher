jest.mock('child_process', () => {
  return {
    execSync: () => 'This is a test message',
  };
});
const execSync = require('child_process').execSync;
test('Temp test', () => {
  expect(execSync).toBeTruthy();
});
