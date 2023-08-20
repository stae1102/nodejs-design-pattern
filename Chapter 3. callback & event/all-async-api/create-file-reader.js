import { consistentRead } from './consistent-read.js';

export function createFileReader(filename) {
  const listeners = [];
  consistentRead(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
}
