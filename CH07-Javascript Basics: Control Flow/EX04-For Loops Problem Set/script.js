console.log('EX1');
for (let i=-10; i<=19; i++){
  console.log(i);
}

console.log('EX2');
for (let i=10; i<=40; i++){
  if (i%2 === 0) console.log(i);
}

console.log('EX3');
for (let i=300; i<=333; i++){
  if (i%2 === 1) console.log(i);
}

console.log('EX4');
for (let i=5; i<=50; i++){
  if (i%15 === 0) console.log(i);
}

console.log('EX5');
for (let i=1; i<=6; i++){
  for (let j=1; j<=i; j++){
    console.log('$');
  }
  console.log('\n');
}

console.log('EX6');
for (let i=1; i<=100; i++){
  if (i%15 === 0) {
    console.log('FizzBuzz');
  }
  else if (i%3 === 0){
    console.log('Fizz');
  }
  else if (i%5 === 0) {
    console.log('Buzz');
  }
  else {
    console.log(i);
  }
}
