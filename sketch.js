function setup() {
  noCanvas();
  const btn = createButton('測試按鈕');
  btn.id('startBtn');
  btn.parent(document.body);
  btn.mousePressed(() => {
    console.log("按鈕被點了");
    alert("按鈕被點了");
  });
}
