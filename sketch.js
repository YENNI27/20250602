let video;
let handpose;
let predictions = [];
let targetX, targetY;
let score = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 初始化 handpose 模型
  handpose = ml5.handpose(video, modelReady);

  // 當模型偵測到手部時，更新 predictions
  handpose.on("predict", results => {
    predictions = results;
  });

  // 設定目標的初始位置
  targetX = random(width);
  targetY = random(height);
}

function modelReady() {
  console.log("Handpose model ready!");
}

function draw() {
  background(220);

  // 顯示攝影機影像
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  image(video, 0, 0, width, height);

  // 畫出目標
  fill(255, 0, 0);
  ellipse(targetX, targetY, 30);

  // 畫出手部追蹤點
  drawHandPoints();

  // 檢查是否碰到目標
  if (checkCollision()) {
    score++;
    targetX = random(width);
    targetY = random(height);
  }

  // 顯示分數
  fill(0);
  textSize(24);
  text(`Score: ${score}`, 10, 30);
}

function drawHandPoints() {
  if (predictions.length > 0) {
    const hand = predictions[0];
    for (let i = 0; i < hand.landmarks.length; i++) {
      const [x, y, z] = hand.landmarks[i];
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 10);
    }
  }
}

function checkCollision() {
  if (predictions.length > 0) {
    const hand = predictions[0];
    const indexFinger = hand.landmarks[8]; // 食指尖端
    const d = dist(indexFinger[0], indexFinger[1], targetX, targetY);
    return d < 30; // 如果距離小於目標半徑，則視為碰撞
  }
  return false;
}
