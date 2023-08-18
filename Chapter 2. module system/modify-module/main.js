import fs from 'fs';
import { mockEnable, mockDisable } from './mock-read.file.js';

// 1. Activate a mocked function.
mockEnable(Buffer.from('Hello World'));

// 2. Use mocked function.
fs.readFile('fake-path', (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(data.toString());
});

mockDisable();
