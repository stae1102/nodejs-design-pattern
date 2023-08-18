import fs, { readFileSync } from 'fs';
import { syncBuiltinESMExports } from 'module';

fs.readFileSync = () => Buffer.from('Hello, ESM');
syncBuiltinESMExports();

console.log(fs.readFileSync === readFileSync);

console.log(readFileSync().toString());
console.log(fs.readFileSync().toString());
