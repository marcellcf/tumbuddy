// Hujan pernak-pernik (bintang, hati, titik) di latar bagian Product Details.
(function () {
  const cv = document.getElementById("rain");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = ["#C42A3F", "#F2A7BE", "#7EB8E5", "#F3D33F", "#7D1830"];
  let w = 0, h = 0, items = [], visible = true;

  function star(r) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath(); ctx.fill();
  }
  function heart(r) {
    ctx.beginPath();
    ctx.moveTo(0, r * .9);
    ctx.bezierCurveTo(-r * 1.4, -r * .1, -r * .6, -r * 1.1, 0, -r * .35);
    ctx.bezierCurveTo(r * .6, -r * 1.1, r * 1.4, -r * .1, 0, r * .9);
    ctx.fill();
  }
  function sparkle(r) {
    ctx.beginPath();
    ctx.moveTo(0, -r); ctx.quadraticCurveTo(0, 0, r, 0); ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0); ctx.quadraticCurveTo(0, 0, 0, -r); ctx.fill();
  }
  const SHAPES = [star, heart, sparkle, (r) => { ctx.beginPath(); ctx.arc(0, 0, r * .45, 0, Math.PI * 2); ctx.fill(); }];

  function make(anyY) {
    return {
      x: Math.random() * w, y: anyY ? Math.random() * h : -20,
      r: 6 + Math.random() * 7, sp: .35 + Math.random() * .55,
      sway: Math.random() * Math.PI * 2, rot: Math.random() * 6, vr: (Math.random() - .5) * .02,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)], a: .35 + Math.random() * .35,
    };
  }
  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(10, Math.min(34, Math.round(w * h / 38000)));
    items = Array.from({ length: n }, () => make(true));
  }
  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    const dpr = cv.width / w;
    for (const it of items) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.translate(it.x + Math.sin(it.sway) * 14, it.y); ctx.rotate(it.rot);
      ctx.globalAlpha = it.a; ctx.fillStyle = it.color; it.shape(it.r);
    }
    ctx.globalAlpha = 1;
  }
  function frame() {
    if (visible) {
      for (const it of items) {
        it.y += it.sp; it.sway += .012; it.rot += it.vr;
        if (it.y > h + 20) Object.assign(it, make(false));
      }
      draw();
    }
    requestAnimationFrame(frame);
  }
  size();
  window.addEventListener("resize", size);
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(cv);
  if (reduce) draw(); else requestAnimationFrame(frame);
})();
