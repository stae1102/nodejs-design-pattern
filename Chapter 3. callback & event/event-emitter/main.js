import { findRegex } from './find-regex.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

findRegex(
  [join(__dirname, 'dataA.txt'), join(__dirname, 'dataB.json')],
  /hello \w+/g
)
  .on('fileread', (file) => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', (err) => console.log(`Error emitted ${err.message}`));
