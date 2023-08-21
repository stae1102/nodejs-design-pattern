import { EventEmitter } from 'events';
import { readFile } from 'fs';

export class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    setImmediate(() => this.emit('start', 'finding files'));
    for (const file of this.files) {
      readFile(file, 'utf8', (err, content) => {
        if (err) {
          return this.emit('error', err);
        }

        this.emit('fileread', file);
        const match = content.match(this.regex);
        if (match) {
          match.forEach((elem) => this.emit('found', file, elem));
        }
      });

      return this;
    }
  }
}
