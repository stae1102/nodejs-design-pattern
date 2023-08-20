import { FindRegexSync } from './find-regex-sync.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const findRegexSyncInstance = new FindRegexSync(/hello \w+/);
findRegexSyncInstance
  .addFile(join(__dirname, 'dataA.txt'))
  .addFile(join(__dirname, 'data.json'))
  // this listener is invoked
  .on('found', (file, match) => console.log(`[Before] Matched "${match}"`))
  .find()
  // this listener is never invoked
  .on('found', (file, match) => console.log(`[After] Matched "${match}"`));
