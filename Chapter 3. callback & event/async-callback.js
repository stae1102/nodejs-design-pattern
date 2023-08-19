function additionAsync(a, b, callback) {
  setTimeout(() => callback(a + b), 100);
}

console.log('Before');
additionAsync(1, 2, (result) => console.log(`Result: ${result}`));
console.log('After');
