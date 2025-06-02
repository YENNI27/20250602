let video;
let started = false;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent(document.body); // 把 canvas 放到 body 裡
  noLoop(); // 預設先不畫圖，直到按下按鈕後再開始

  const btn = select("#startBtn");
  if (!btn) {
    console.error("❌ 找不到 startBtn 按鈕");
  } else {
    console.log("✅ 成功綁定按鈕");

    btn.mousePressed(() => {
      console.log("🔘 按鈕被點了");
      btn.hide(); // 隱藏按鈕

      // 啟動攝影機
      video = createCapture(VIDEO, () => {
        console.log("📷 攝影機啟動成功");
      });
      video.size(640, 480);
      video.hide(); // 隱藏原始 HTML 視訊，改用 p5 畫面顯示

      started = true;
      loop(); // 開始畫圖
    });
  }
}

function draw() {
  background(200);
  if (started && video) {
    image(video, 0, 0, width, height);
  }
}
