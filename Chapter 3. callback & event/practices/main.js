import { FindRegex } from './find-regex.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const findRegexInstance = new FindRegex(/hello \w+/g);

findRegexInstance
  .addFile(join(__dirname, 'dataA.txt'))
  .addFile(join(__dirname, 'dataB.json'))
  .find()
  .on('start', (message) => console.log(message))
  .on('found', (file, match) =>
    console.log(`Matched "${match}" in file ${file}`)
  )
  .on('error', (err) => console.log(`Error emitted ${err.message}`));
