import { createFileReader } from './create-file-reader.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const reader1 = createFileReader(join(__dirname, 'data.txt'));
reader1.onDataReady((data) => {
  console.log(`First call data: ${data}`);

  // try to read same file
  const reader2 = createFileReader(join(__dirname, 'data.txt'));
  reader2.onDataReady((data) => {
    console.log(`Second call data: ${data}`);
  });
});
