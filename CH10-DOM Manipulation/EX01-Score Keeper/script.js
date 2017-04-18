let winScore = 5;
let player1Score = 0;
let player2Score = 0;
let gameOver = false;

let p1ScoreDisplay = document.getElementById('p1ScoreDisplay');
let p2ScoreDisplay = document.getElementById('p2ScoreDisplay');
let player1Btn = document.getElementById('player1Btn');
let player2Btn = document.getElementById('player2Btn');
let winScoreDisplay = document.getElementById('winScoreDisplay');
let inputWinScore = document.getElementById('inputWinScore');
let resetBtn = document.getElementById('resetBtn');

player1Btn.addEventListener('click', function(e){
  if (gameOver) return;
  p1ScoreDisplay.innerHTML = ++player1Score;
  if (player1Score === winScore){
    p1ScoreDisplay.classList.add('winner');
    gameOver = true;
  }
});

player2Btn.addEventListener('click', function(){
  if (gameOver) return;
  p2ScoreDisplay.innerHTML = ++player2Score;
  if (player2Score === winScore){
    p2ScoreDisplay.classList.add('winner');
    gameOver = true;
  }
});

resetBtn.addEventListener('click', reset);

inputWinScore.addEventListener('change', function(e){
  winScore = Number(this.value);
  winScoreDisplay.innerHTML = winScore;
  reset();
});

function reset(){
  player1Score = 0;
  player2Score = 0;
  p1ScoreDisplay.innerHTML = player1Score;
  p2ScoreDisplay.innerHTML = player2Score;
  p1ScoreDisplay.classList.remove('winner');
  p2ScoreDisplay.classList.remove('winner');
  gameOver = false;
}
