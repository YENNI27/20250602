let video;
let handpose;
let predictions = [];

let isCameraOn = false;
let startButton;

let question = "以下哪一個是學習管理系統（LMS）？";
let options = ["Zoom", "Moodle", "YouTube"];
let correctAnswer = 1;
let selected = -1;

function setup() {
  createCanvas(640, 480);

  // 加入開始按鈕
  startButton = createButton("點我開始遊戲 🚀（啟用鏡頭）");
  startButton.position(10, height + 10);
  startButton.mousePressed(startCamera);
}

function startCamera() {
  video = createCapture(VIDEO, () => {
    console.log("攝影機啟動");
  });
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("Handpose 模型載入完成");
  });

  handpose.on("predict", results => {
    predictions = results;
  });

  isCameraOn = true;
  startButton.hide(); // 隱藏按鈕
}

function draw() {
  background(220);

  if (isCameraOn) {
    image(video, 0, 0, width, height);
    drawQuestion();
    drawHand();
  } else {
    fill(50);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("請點選下方按鈕以啟用鏡頭開始遊戲", width / 2, height / 2);
  }
}

function drawQuestion() {
  fill(0, 150);
  rect(20, 20, width - 40, 80, 10);
  fill(255);
  textSize(18);
  textAlign(LEFT, TOP);
  text(question, 30, 30);

  for (let i = 0; i < options.length; i++) {
    let x = 50;
    let y = 120 + i * 80;
    fill(i === selected ? "orange" : "white");
    stroke(0);
    rect(x, y, 540, 60, 10);
    fill(0);
    noStroke();
    textSize(20);
    text(options[i], x + 20, y + 18);
  }
}

function drawHand() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    let indexTip = hand.landmarks[8]; // 食指指尖

    let x = indexTip[0];
    let y = indexTip[1];

    fill(255, 0, 0);
    noStroke();
    ellipse(x, y, 20, 20);

    for (let i = 0; i < options.length; i++) {
      let ox = 50;
      let oy = 120 + i * 80;
      let ow = 540;
      let oh = 60;
      if (x > ox && x < ox + ow && y > oy && y < oy + oh) {
        selected = i;
        if (i === correctAnswer) {
          fill(0, 255, 0);
          textSize(24);
          text("答對了！🎉", 250, 400);
        } else {
          fill(255, 0, 0);
          textSize(24);
          text("再試一次", 250, 400);
        }
      }
    }
  }
}
