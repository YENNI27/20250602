let video;
let started = false;

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent(document.body);
  noLoop();

  const btn = select("#startBtn");
  btn.mousePressed(() => {
    if (!started) {
      video = createCapture(VIDEO, () => {
        console.log("📷 攝影機啟動");
      });
      video.size(640, 480);
      video.hide();
      started = true;
      loop();
    }
  });
}

function draw() {
  background(220);
  if (started) {
    image(video, 0, 0);
  }
}
