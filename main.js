//1. 랜덤숫자 나오기
//2. 랜덤 숫자를 입력한 후 playbtn 누르면 up down 정답 표시하기
//3. 리셋 버튼 누르면 게임 다시 시작
//4. 남은 기회 다 쓰면 버튼 사라지게
//5. 같은 숫자 쓰거나 범위 내의 숫자가 아니면 기회를 깎지 않음

let answerNum = 0;
let playBtn = document.getElementById("playBtn");
let resetBtn = document.getElementById("resetBtn");
let numInput = document.querySelector(".numInput");
let resultArea = document.querySelector(".resultArea");
let chanceArea = document.querySelector(".chanceArea");
let bunnyImage = document.getElementById("bunnyImage");
let chanceNum = 7;
let gameOver = false;
let answerAll = [];

const pickRandom = () => {
  answerNum = Math.floor(Math.random() * 100) + 1;
  console.log(answerNum);
};
//1. 랜덤숫자 나오기

const play = () => {
  // if (window.event.keyCode == 13) {
  //   event.preventDefault();
  // }
  //엔터키 구현은 보류

  let inputValue = numInput.value;

  if (!inputValue) {
    bunnyImage.src =
      "https://i.pinimg.com/originals/f2/b5/37/f2b5373a7a29b76425695f312315ea77.gif";
    resultArea.textContent = "음? 얼른 입력해봐!";
    return;
  }
  //아무것도 안적었을 때

  if (inputValue < 1 || inputValue > 100) {
    bunnyImage.src =
      "https://i.pinimg.com/originals/de/ac/9f/deac9f5cff04951294813862129c39f3.gif";
    resultArea.textContent = "1부터 100 중에 입력해야돼!";
    return;
  }
  //1-100 사이의 번호가 아닐 떄

  if (answerAll.includes(inputValue)) {
    bunnyImage.src =
      "https://i.pinimg.com/originals/de/ac/9f/deac9f5cff04951294813862129c39f3.gif";
    resultArea.textContent = "이미 썼잖아~ 다른 숫자를 입력해봐!";
    return;
  }
  //5. 같은 숫자 쓰거나 범위 내의 숫자가 아니면 기회를 깎지 않음

  chanceNum--;
  //play를 누를 수록 기회는 줄어듦

  chanceArea.textContent = `으아아 ${chanceNum}번 남았다`;
  //줄어든 기회 표기

  if (inputValue > answerNum) {
    resultArea.textContent = "좀 더 밑으로 생각해봐";
    bunnyImage.src =
      "https://i.pinimg.com/originals/5c/35/9d/5c359d74bc3bdc150699455d5f19a749.gif";
  } else if (inputValue < answerNum) {
    resultArea.textContent = "아니야 더 위라구";
    bunnyImage.src =
      "https://i.pinimg.com/originals/a4/d1/b8/a4d1b83987f62adb5417a0f34fd0416c.gif";
  } else if (inputValue == answerNum) {
    resultArea.textContent = "와 정답~!";
    bunnyImage.src =
      "https://i.pinimg.com/originals/40/07/88/40078804b28345218c35e6a322e49887.gif";
    chanceNum = 7;
    chanceArea.textContent = "";
    gameOver = true;
    //정답일 때 게임오버
  }
  //2. 랜덤 숫자를 입력한 후 playbtn 누르면 up down 정답 표시하기

  answerAll.push(inputValue);
  //적은 답안 배열에 저장

  if (chanceNum < 1) {
    gameOver = true;
    resultArea.textContent = "으아악 실패~";
    chanceArea.textContent = ``;
    bunnyImage.src =
      "https://i.pinimg.com/originals/7a/7b/47/7a7b4774a1bce5540824f76451d94f03.gif";
  }

  if (gameOver) {
    playBtn.disabled = true;
    playBtn.style.color = "#090909";
  } //4. 남은 기회 다 쓰면 버튼 사라지게
  //게임 오버가 되면 정답 배열은 비워지고 playBtn은 비활성화됨
};

const reset = () => {
  playBtn.disabled = false;
  answerAll = [];
  gameOver = false;

  chanceArea.textContent = "";
  numInput.value = "";
  chanceNum = 7;

  if (answerNum == numInput.value) {
    resultArea.textContent = `토끼는 무슨 숫자를 생각 중일까?`;
    bunnyImage.src =
      "https://i.pinimg.com/originals/63/80/4c/63804c1e29b9bd807be9db3a539d5102.gif";
    chanceArea.textContent = "기회는 총 7번!";
  } else {
    bunnyImage.src =
      "https://i.pinimg.com/originals/0c/19/ae/0c19ae9544c73425bb8002406b97b9bb.gif";
    resultArea.textContent = `정답은 ${answerNum}이었다구~`;
    setTimeout(() => {
      resultArea.textContent = `처음부터 다시 시작!`;
      bunnyImage.src =
        "https://i.pinimg.com/originals/63/80/4c/63804c1e29b9bd807be9db3a539d5102.gif";
      chanceArea.textContent = "기회는 총 7번!";
    }, 3000);
  }
  pickRandom();
};
//3. 리셋 버튼 누르면 게임 다시 시작

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);

numInput.addEventListener("focus", () => {
  numInput.value = "";
});

pickRandom();
