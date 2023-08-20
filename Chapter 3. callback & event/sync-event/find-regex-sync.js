import { EventEmitter } from 'events';
import { readFileSync } from 'fs';

export class FindRegexSync extends EventEmitter {
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
    for (const file of this.files) {
      let content;

      try {
        content = readFileSync(file, 'utf8');
      } catch (err) {
        this.emit('error', err);
      }

      this.emit('fileread', file);
      const match = content.match(this.regex);
      if (match) {
        match.forEach((elem) => this.emit('found', file, elem));
      }

      return this;
    }
  }
}
