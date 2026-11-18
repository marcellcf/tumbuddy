// Efek tambahan: intro logo, judul muncul per kata, charm melayang,
// foto produk unggulan meluncur masuk, teks berubah warna saat di-scroll,
// tombol WhatsApp melayang.
(function () {
  const $ = (s) => document.querySelector(s);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // ---------- intro logo (sekali per sesi) ----------
  const intro = $("#intro");
  let seen = false;
  try { seen = sessionStorage.getItem("tb_intro") === "1"; sessionStorage.setItem("tb_intro", "1"); } catch (e) {}
  if (intro) {
    if (seen || reduce) intro.remove();
    else { document.body.classList.add("intro-on"); setTimeout(() => { intro.classList.add("intro--out"); document.body.classList.remove("intro-on"); }, 1100); setTimeout(() => intro.remove(), 2100); }
  }

  // ---------- data produk unggulan & kutipan ----------
  $("#featTitle").textContent = FEATURED.title;
  $("#featDesc").textContent = FEATURED.desc;
  $("#featList").innerHTML = FEATURED.points.map((p) => `<li>${p.replace(/</g, "&lt;")}</li>`).join("");
  $("#featBtn").href = wa(FEATURED.waMessage);
  $("#waFloat").href = wa(SITE.waGreeting);

  // ---------- judul muncul per kata ----------
  function split(el) {
    let n = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span"); w.className = "w";
            const i = document.createElement("span"); i.textContent = part; i.style.setProperty("--wi", n++);
            w.appendChild(i); frag.appendChild(w);
          });
          ch.replaceWith(frag);
        } else if (ch.nodeType === 1 && ch.tagName !== "BR") walk(ch);
      });
    };
    walk(el); el.classList.add("split");
  }
  document.querySelectorAll("[data-reveal] h2, .hero__title").forEach(split);

  // ---------- kutipan: kata menyala mengikuti scroll ----------
  const quote = $("#quote");
  let inEm = false;
  quote.innerHTML = ABOUT.quote.split(/\s+/).map((w) => {
    const start = w.startsWith("*"), end = w.endsWith("*") || /\*[.,!?]$/.test(w);
    if (start) inEm = true;
    const em = inEm;
    if (end) inEm = false;
    return `<span${em ? ' class="em"' : ""}>${w.replace(/\*/g, "").replace(/</g, "&lt;")}</span>`;
  }).join(" ");
  const qWords = [...quote.children];

  // ---------- elemen yang bergerak mengikuti scroll ----------
  const floaties = [...document.querySelectorAll(".floaty")];
  const clips = [...document.querySelectorAll("[data-clip]")];
  const waFloat = $("#waFloat"), hero = $("#home"), contact = $("#contact");

  function frame() {
    const vh = window.innerHeight;
    if (!reduce) {
      floaties.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        const off = r.top + r.height / 2 - vh / 2;
        const sp = parseFloat(el.dataset.speed), rot = parseFloat(el.dataset.rot || 0);
        el.style.transform = `translate3d(0, ${(off * sp).toFixed(1)}px, 0) rotate(calc(var(--r, 0deg) + ${(off / vh * rot).toFixed(1)}deg))`;
      });
    }
    clips.forEach((el) => {
      const r = el.getBoundingClientRect();
      const delay = parseFloat(el.dataset.clipDelay || 0) * 0.12;
      const p = reduce ? 1 : clamp((vh - r.top) / (vh * 0.75) - delay, 0, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.style.setProperty("--clip", ((1 - e) * 100).toFixed(2) + "%");
      el.style.setProperty("--zoom", (1.18 - 0.18 * e).toFixed(3));
    });
    const qr = quote.getBoundingClientRect();
    const qp = reduce ? 1 : clamp((vh * 0.85 - qr.top) / (qr.height + vh * 0.4), 0, 1);
    const lit = Math.round(qp * qWords.length);
    qWords.forEach((w, i) => w.classList.toggle("lit", i < lit));
    const pastHero = hero.getBoundingClientRect().bottom < 80;
    const atContact = contact.getBoundingClientRect().top < vh * 0.6;
    waFloat.classList.toggle("wa-float--on", pastHero && !atContact);
  }
  let ticking = false;
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { frame(); ticking = false; }); } };
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  frame();

  // ---------- nama brand raksasa di footer ----------
  const mark = document.querySelector(".footer__mark");
  new IntersectionObserver((en) => { if (en[0].isIntersecting) mark.classList.add("in"); }, { threshold: 0.2 }).observe(mark);
})();
