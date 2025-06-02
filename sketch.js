let video;
let handpose;
let predictions = [];

let question = "哪一個是教育科技常用的 LMS（學習管理系統）？";
let options = ["YouTube", "Moodle", "LINE"];
let correctIndex = 1;
let selected = -1;
let feedback = "";

let isStarted = false;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent(document.body);
  noLoop(); // 等按鈕按下才開始畫

  const btn = select("#startBtn");
  btn.mousePressed(startGame);
}

function startGame() {
  select("#startBtn").hide();

  video = createCapture(VIDEO, () => {
    console.log("📷 攝影機啟動");
  });
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("🤖 Handpose 載入完成");
  });

  handpose.on("predict", results => {
    predictions = results;
  });

  isStarted = true;
  loop();
}

function draw() {
  background(220);
  if (!isStarted) return;

  image(video, 0, 0, width, height);
  drawQuestion();
  drawHand();
  showFeedback();
}

function drawQuestion() {
  fill(0, 160);
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
    let indexTip = hand.landmarks[8];
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
        if (i === correctIndex) {
          feedback = "✅ 答對了！Moodle 是一種 LMS";
        } else {
          feedback = "❌ 錯誤，再試一次";
        }
        break;
      }
    }
  }
}

function showFeedback() {
  if (feedback) {
    textSize(24);
    fill(feedback.includes("✅") ? "green" : "red");
    textAlign(CENTER, CENTER);
    text(feedback, width / 2, height - 40);
  }
}
