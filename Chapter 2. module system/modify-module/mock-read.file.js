// 1. The fs is an exported object.
import fs from 'fs';

// 2. Save original fs readFile reference value.
const originalReadFile = fs.readFile;
let mockedResponse = null;

// 3. Main readFile function that replaces original fs readFile function.
function mockedReadFile(path, cb) {
  setImmediate(() => {
    cb(null, mockedResponse);
  });
}

// 4. Activate mock function.
export function mockEnable(respondWith) {
  mockedResponse = respondWith;
  fs.readFile = mockedReadFile;
}

// 5. Restore original fs function.
export function mockDisable() {
  fs.readFile = originalReadFile;
}
