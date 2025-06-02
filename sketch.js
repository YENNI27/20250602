let video;
let handpose;
let predictions = [];

let question = "以下哪一個是學習管理系統（LMS）？";
let options = ["Zoom", "Moodle", "YouTube"];
let correctIndex = 1;
let selected = -1;

let isStarted = false;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent(document.body);
  noLoop(); // 初始不跑 draw

  const btn = select("#startBtn");
  if (btn) {
    btn.mousePressed(startGame);
  } else {
    console.error("❌ 找不到按鈕");
  }
}

function startGame() {
  const btn = select("#startBtn");
  btn.hide();

  video = createCapture(VIDEO, () => {
    console.log("📷 攝影機啟動");
  });
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("🧠 handpose 模型載入成功");
  });

  handpose.on("predict", results => {
    predictions = results;
  });

  isStarted = true;
  loop();
}

function draw() {
  background(240);

  if (!isStarted) return;

  image(video, 0, 0, width, height);
  drawQuestion();
  drawHand();
}

function drawQuestion() {
  fill(0, 180);
  rect(20, 20, width - 40, 80, 10);
  fill(255);
  textSize(20);
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
          fill(0, 200, 0);
          textSize(26);
          text("✅ 答對了！", 250, 420);
        } else {
          fill(200, 0, 0);
          textSize(26);
          text("❌ 再試一次", 250, 420);
        }
        break;
      }
    }
  }
}

    image(video, 0, 0, width, height);
  }
}
