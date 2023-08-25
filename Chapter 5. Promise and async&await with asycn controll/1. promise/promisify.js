function promisify(callbackBasedApi) {
  return function proimisified(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        },
      ];
      callbackBasedApi(...newArgs);
    });
  };
}
