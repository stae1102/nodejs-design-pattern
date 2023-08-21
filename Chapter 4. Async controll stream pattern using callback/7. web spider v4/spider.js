import fs from 'fs';
import superagent from 'superagent';
import { mkdirp } from 'mkdirp';
import path from 'path';
import { urlToFilename } from '../utils.js';
import { spiderLinks } from './spider-link.js';

export function spiderTask(url, nesting, queue, cb) {
  const filename = urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err);
      }

      // Download non-existent file
      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, queue);
        return cb();
      });
    }

    // Existing file already, process link
    spiderLinks(fileContent, nesting, queue);
    return cb();
  });
}

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), {
    fs: (err) => {
      if (err) {
        return cb(err);
      }
      fs.writeFile(filename, contents, cb);
    },
  });
}

function download(url, filename, cb) {
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
}

const spidering = new Set();
export function spider(url, nesting, queue) {
  if (spidering.has(url)) {
    return;
  }

  spidering.add(url);
  queue.pushTask((done) => {
    spiderTask(url, nesting, queue, done);
  });
}
