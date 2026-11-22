// Efek hujan di belakang model 3D strap.
(function () {
  const cv = document.getElementById("rain");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, drops = [], splashes = [], visible = true;
  const COLORS = ["rgba(91,14,30,", "rgba(196,42,63,", "rgba(126,184,229,"];
  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(w * h / 4200);
    drops = Array.from({ length: n }, () => drop(true));
  }
  function drop(anyY) {
    const z = Math.random();
    return { x: Math.random() * (w + 60) - 30, y: anyY ? Math.random() * h : -20 - Math.random() * 80,
      len: 10 + z * 18, sp: 3 + z * 6, a: .15 + z * .35, c: COLORS[Math.random() < .7 ? 0 : (Math.random() < .5 ? 1 : 2)] };
  }
  function frame() {
    if (visible) {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      for (const d of drops) {
        d.y += d.sp; d.x -= d.sp * 0.18;
        if (d.y > h - 4) {
          if (Math.random() < .5) splashes.push({ x: d.x, y: h - 4, r: 1, a: d.a, c: d.c });
          Object.assign(d, drop(false));
        }
        ctx.strokeStyle = d.c + d.a + ")"; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + d.len * 0.18, d.y - d.len); ctx.stroke();
      }
      splashes = splashes.filter((s) => s.a > 0.02);
      for (const s of splashes) {
        s.r += .6; s.a *= .9;
        ctx.strokeStyle = s.c + s.a + ")"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(s.x, s.y, s.r * 2, s.r * .6, 0, 0, Math.PI * 2); ctx.stroke();
      }
    }
    requestAnimationFrame(frame);
  }
  size();
  window.addEventListener("resize", size);
  new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(cv);
  if (reduce) { for (const d of drops) { ctx.strokeStyle = d.c + d.a + ")"; ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + 2, d.y - d.len); ctx.stroke(); } }
  else requestAnimationFrame(frame);
})();
