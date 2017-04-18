let numSquare = 6;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const message = document.querySelector('#message');
const h1 = document.querySelector('h1');
const modeBtn = document.querySelectorAll('.modeBtn');

init();
resetBtn.addEventListener('click', reset);

function init() {
  setListenerToModeBtn();
  setListenerToSuqares();
  reset();
}

function setListenerToModeBtn() {
  for (let i=0; i<modeBtn.length; i++){
    modeBtn[i].addEventListener('click', function(){
      modeBtn[0].classList.remove('selected');
      modeBtn[1].classList.remove('selected');
      this.classList.add('selected');
      (this.innerHTML === 'Easy')? numSquare = 3: numSquare = 6;
      reset();
    });
  }
}

function setListenerToSuqares() {
  for (let i=0; i<squares.length; i++){
    squares[i].style.background = colors[i];
    squares[i].addEventListener('click', function(){
      const clickedColor = this.style.background;
      if (clickedColor === pickedColor){
        message.innerHTML = 'Correct!';
        resetBtn.innerHTML = 'Play again?';
        changeColor();
      }
      else {
        message.innerHTML = 'Try again!';
        squares[i].style.background = '#232323';
      }
    });
  }
}

function reset() {
  colors = generateColors(numSquare);
  pickedColor = pickColor();
  colorDisplay.innerHTML = pickedColor;
  h1.style.background = 'steelblue';
  resetBtn.innerHTML = 'New colors';
  message.innerHTML = '';
  for (let i=0; i<squares.length; i++){
    if (colors[i]){
      squares[i].style.display = 'block';
      squares[i].style.background = colors[i];
    }
    else {
      squares[i].style.display = 'none';
    }
  }
}

function changeColor() {
  for (let i=0; i<colors.length; i++){
    squares[i].style.background = pickedColor;
  }
  h1.style.background = pickedColor;
}

function pickColor() {
  let num = Math.floor(Math.random()*colors.length);
  return colors[num];
}

function generateColors(num) {
  let arr = [];
  for (let i=0; i<num; i++){
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  let r = Math.floor(Math.random()*256);
  let g = Math.floor(Math.random()*256);
  let b = Math.floor(Math.random()*256);
  return `rgb(${r}, ${g}, ${b})`;
}
