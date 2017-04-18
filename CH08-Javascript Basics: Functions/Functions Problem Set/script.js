console.log('EX1: isEven');

function isEven(num) {
  return (num%2) === 0;
}

console.log(isEven(4), isEven(21), isEven(68), isEven(333));

console.log('EX2: factorial');

function factorial(num) {
  if (num === 0 || num === 1) return 1;
  return num*factorial(num-1);
}

console.log(factorial(5), factorial(2), factorial(10), factorial(0));

console.log('EX3: kebabToSnake');

function kebabToSnake(str) {
  return str.replace(/-/igm, '_');
}

console.log(kebabToSnake('hello-world'), kebabToSnake('dogs-are-awesome'), kebabToSnake('blah'));
