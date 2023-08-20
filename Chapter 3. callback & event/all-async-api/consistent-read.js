import { readFile } from 'fs';

const cache = new Map();

// Conditionally perform either sync or async job
export function consistentRead(filename, callback) {
  if (cache.has(filename)) {
    setImmediate(() => callback(cache.get(filename)));
  } else {
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data);
      callback(data);
    });
  }
}
