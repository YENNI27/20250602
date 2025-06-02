function setup() {
  noCanvas();

  const btn = select("#startBtn");

  if (!btn) {
    console.error("❌ 找不到按鈕");
  } else {
    console.log("✅ 成功綁定按鈕");
    btn.mousePressed(() => {
      console.log("🔘 按鈕被點了！");
      alert("你點到我了！");
    });
  }
}
