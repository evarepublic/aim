const startBtn = document.querySelector("#start"),
  screens = document.querySelectorAll(".screen"),
  timeList = document.querySelector("#time-list"),
  timeEl = document.querySelector("#time"),
  board = document.querySelector("#board"),
  colors = [
    "#ADFF2F",
    "#00FFFF",
    "#FF1493",
    "#FFFF00",
    "#6A5ACD",
    "#7FFFD4",
    "#FF4500",
    "#FFE4E1",
  ];

let time = 0,
  score = 0;

startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 40);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  setColor(circle);
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setColor(elem) {
  const color = getRandomColor();
  elem.style.background = color;
  elem.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function winTheGame() {
  function kill() {
    const circle = document.querySelector(".circle");
    if (circle) {
      circle.click();
    }
  }
  setInterval(kill, 75);
}
