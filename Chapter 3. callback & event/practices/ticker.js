import { EventEmitter } from 'events';

function tick(number, callback) {
  const milliseconds = new Date().getMilliseconds();
  const millisecondsToBeTimedOut = milliseconds + number;

  const emitter = new EventEmitter();

  let cnt = 0;

  function emitTick() {
    setTimeout(() => {
      const milliseconds = new Date().getMilliseconds();
      if (milliseconds % 5 === 0) {
        emitter.emit('error');
      }

      if (milliseconds < millisecondsToBeTimedOut) {
        cnt++;
        emitter.emit('tick', cnt);
        emitTick();
      }
    }, 50);
  }

  setImmediate(() => emitter.emit('tick', cnt));
  emitTick();

  setTimeout(() => {
    callback(cnt);
  }, number);

  return emitter;
}

tick(500, (totalCnt) => console.log(`Total tick count: ${totalCnt}`))
  .on('tick', (cnt) => console.log(`Tick count: ${cnt}`))
  .on('error', () => console.log('error occured'));
