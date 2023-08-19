import { readFile } from 'fs';

const cache = new Map();

// Conditionally perform either sync or async job
export function inconsistentRead(filename, cb) {
  if (cache.has(filename)) {
    cb(cache.get(filename));
  } else {
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data);
      cb(data);
    });
  }
}
