console.log('EX1: printReverse');
function printReverse(arr) {
  for (let i=arr.length-1; i>=0; i--){
    console.log(arr[i]);
  }
}

console.log('EX2: isUniform');
function isUniform(arr) {
  let key = arr[0];
  for (let i=1; i<arr.length; i++){
    if (arr[i] !== key) return false;
  }
  return true;
}


console.log('EX3: sumArray');
function sumArray(arr) {
  let sum = 0;
  for (let i=0; i<arr.length; i++) sum = sum + arr[i];
  return sum;
}

console.log('EX4: max');
function max(arr) {
  arr.sort((a, b) => a<b);
  return arr[0];
}
