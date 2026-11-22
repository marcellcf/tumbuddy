(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rupiah = (n) => (n == null ? "Tanya harga" : "Rp" + Number(n).toLocaleString("id-ID"));
  const wa = (msg) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  const typeLabel = (t) => (FILTERS.find((f) => f.id === t) || {}).label || t;
  const todo = (s) => esc(s).replace(/\[([^\]]+)\]/g, '<mark class="todo">[$1]</mark>');

  // ---------- navigasi ----------
  const nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
  const onScroll = () => nav.classList.toggle("nav--solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("nav--open"); toggle.setAttribute("aria-expanded", "false"); }
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["home", "products", "details", "about", "reviews", "contact"].forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  // ---------- katalog ----------
  const grid = $("#productGrid"), filters = $("#filters");
  let current = "all";
  filters.innerHTML = FILTERS.map((f) =>
    `<button class="chip${f.id === "all" ? " chip--on" : ""}" role="tab" aria-selected="${f.id === "all"}" data-f="${f.id}">${esc(f.label)}</button>`).join("");
  function fitCta() {
    const cta = grid.querySelector(".cta-card"); if (!cta) return;
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const n = grid.querySelectorAll(".card").length;
    const rem = (cols - (n % cols)) % cols;
    cta.style.gridColumn = rem ? `span ${rem}` : "1 / -1";
    cta.classList.toggle("cta-card--wide", !rem || rem >= 3);
    cta.classList.toggle("cta-card--one", rem === 1);
  }
  window.addEventListener("resize", fitCta);
  function renderGrid() {
    const list = PRODUCTS.filter((p) => current === "all" || p.type === current);
    grid.innerHTML = list.map((p, i) => `
      <article class="card" style="--i:${i}" data-id="${p.id}" tabindex="0" aria-label="${esc(p.name)}">
        <div class="card__img"><img src="${p.img}" alt="${esc(p.name + " " + (p.variant || ""))}" loading="lazy"></div>
        <div class="card__body">
          <h3>${esc(p.name)}</h3>
          <div class="dots">${p.colors.map((c) => `<i style="background:${c}"></i>`).join("")}</div>
          <div class="card__foot"><span class="price">${rupiah(p.price)}</span><span class="card__more">Detail →</span></div>
        </div>
      </article>`).join("");
    grid.insertAdjacentHTML("beforeend", `
      <aside class="cta-card" style="--i:${list.length}">
        <svg class="cta-card__star" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 6l12.6 29.4L94 38l-23.6 21.6L77.2 92 50 75.4 22.8 92l6.8-32.4L6 38l31.4-2.6z"/></svg>
        <div class="cta-card__photos" aria-hidden="true">
          <img src="sky-lemon.jpg" alt=""><img src="cotton-pop.jpg" alt=""><img src="black-rose.jpg" alt="">
        </div>
        <div class="cta-card__text">
          <p class="eyebrow eyebrow--light">Custom order</p>
          <h3>Belum nemu yang <em>pas?</em></h3>
          <p>Pilih sendiri warna tali dan charm-nya, nanti kami anyamkan khusus buat kamu.</p>
          <a class="btn btn--cream btn--small" href="${linkKlik("custom")}" target="_blank" rel="noopener">Request custom</a>
        </div>
      </aside>`);
    fitCta();
    grid.querySelectorAll(".card, .cta-card").forEach((c) => requestAnimationFrame(() => c.classList.add("card--in")));
    bindTilt();
  }
  filters.addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    current = b.dataset.f;
    filters.querySelectorAll(".chip").forEach((x) => { const on = x === b; x.classList.toggle("chip--on", on); x.setAttribute("aria-selected", String(on)); });
    renderGrid();
  });
  grid.addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) openModal(c.dataset.id); });
  grid.addEventListener("keydown", (e) => { if (e.key === "Enter") { const c = e.target.closest(".card"); if (c) openModal(c.dataset.id); } });

  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function bindTilt() {
    if (!fine || reduce) return;
    grid.querySelectorAll(".card").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
      });
      c.addEventListener("pointerleave", () => { c.style.transform = ""; });
    });
  }
  renderGrid();

  // ---------- modal produk ----------
  const modal = $("#modal");
  function openModal(id) {
    const p = PRODUCTS.find((x) => x.id === id); if (!p) return;
    $("#modalImg").src = p.img; $("#modalImg").alt = p.name;
    $("#modalType").textContent = p.variant || typeLabel(p.type);
    $("#modalTitle").textContent = p.name;
    $("#modalPrice").textContent = rupiah(p.price);
    $("#modalDesc").textContent = p.desc;
    $("#modalDots").innerHTML = p.colors.map((c) => `<i style="background:${c}"></i>`).join("");
    $("#modalOrder").href = linkKlik("pesan-" + p.id);
    modal.classList.add("modal--open"); modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $(".modal__close").focus();
  }
  function closeModal() { modal.classList.remove("modal--open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  modal.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // ---------- detail produk ----------
  $("#specs").innerHTML = DETAILS.specs.map((s) => `<div class="spec"><dt>${esc(s.label)}</dt><dd>${todo(s.value)}</dd></div>`).join("");
  const ICONS = {
    hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12m0-6.5V4a1.5 1.5 0 0 1 3 0v8m0-6.5a1.5 1.5 0 0 1 3 0V12m0-4.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L3.6 16a1.6 1.6 0 0 1 2.4-2.1L8 16"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V6z"/><path d="M9 12l2 2 4-4"/>',
    grip: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  };
  $("#perks").innerHTML = DETAILS.perks.map((p) => `
    <div class="perk"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[p.icon] || ""}</svg>
    <div><strong>${esc(p.title)}</strong><span>${esc(p.text)}</span></div></div>`).join("");

  // ---------- model 3D ----------
  const canvas = $("#strap3d"), stage = canvas.parentElement;
  let strap = null;
  try { strap = window.initStrap3D && window.initStrap3D(canvas, { colors: SWATCHES[0] }); } catch (e) { strap = null; }
  if (!strap) stage.classList.add("viewer__stage--fallback");
  $("#swatches").innerHTML = SWATCHES.map((s, i) => `
    <button class="swatch${i === 0 ? " swatch--on" : ""}" data-i="${i}" aria-label="Warna ${esc(s.name)}" title="${esc(s.name)}">
      <span style="background:linear-gradient(135deg, ${s.a} 50%, ${s.b} 50%)"></span></button>`).join("") +
    `<span class="swatch__name" id="swatchName">${esc(SWATCHES[0].name)}</span>`;
  $("#swatches").addEventListener("click", (e) => {
    const b = e.target.closest(".swatch"); if (!b) return;
    const s = SWATCHES[+b.dataset.i];
    document.querySelectorAll(".swatch").forEach((x) => x.classList.toggle("swatch--on", x === b));
    $("#swatchName").textContent = s.name;
    if (strap) strap.setColors(s);
  });

  // ---------- about ----------
  $("#story").innerHTML = ABOUT.story.map((p) => `<p>${esc(p).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`).join("");
  if (ABOUT.title) $("#aboutTitle").innerHTML = esc(ABOUT.title).replace(/\*(.+?)\*/g, "<em>$1</em>");
  $("#vision").textContent = ABOUT.vision;
  $("#mission").innerHTML = ABOUT.mission.map((m) => `<li>${esc(m)}</li>`).join("");

  // ---------- reviews ----------
  const star = (on) => `<svg viewBox="0 0 24 24" class="${on ? "on" : ""}"><path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.4 6.7L12 17.3l-6 3.4 1.4-6.7L2.3 9.4l6.8-.7z"/></svg>`;
  const stars = (n) => [1, 2, 3, 4, 5].map((i) => star(i <= Math.round(n))).join("");
  if (REVIEWS.length) {
    const avg = REVIEWS.reduce((s, r) => s + Number(r.rating || 0), 0) / REVIEWS.length;
    $("#rating").innerHTML = `<div class="rating__num">${avg.toFixed(1).replace(".", ",")}</div><div class="stars">${stars(avg)}</div><p>dari ${REVIEWS.length} ulasan pembeli</p>`;
    $("#reviewList").innerHTML = REVIEWS.map((r) => `
      <figure class="review"><div class="stars stars--sm">${stars(r.rating)}</div>
      <blockquote>${esc(r.text)}</blockquote>
      <figcaption><strong>${esc(r.name)}</strong>${r.product ? ` · ${esc(r.product)}` : ""}</figcaption></figure>`).join("");
  } else {
    $("#rating").innerHTML = `<div class="rating__num rating__num--new">Baru</div><div class="stars">${stars(0)}</div><p>Belum ada ulasan. Jadilah yang pertama!</p>`;
    $("#reviewList").innerHTML = `
      <div class="review review--invite">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-8-5-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 16 12 21 12 21z"/></svg>
        <blockquote>Sudah pakai strap Tumbuddy_ID? Ceritakan pengalamanmu, ulasanmu akan kami tampilkan di sini.</blockquote>
        <a class="btn btn--cream" href="${linkKlik("ulasan")}" target="_blank" rel="noopener">Kirim ulasan lewat WhatsApp</a>
      </div>`;
  }
  if (REVIEWS.length && typeof REVIEWS_NOTE !== "undefined" && REVIEWS_NOTE) {
    $("#reviewList").insertAdjacentHTML("afterend", `<p class="reviews__note">${esc(REVIEWS_NOTE)}</p>`);
  }
  const ugc = $("#ugc");
  if (CUSTOMER_PHOTOS.length) {
    ugc.innerHTML = `<h3>Foto dari pelanggan</h3><div class="ugc__grid">${CUSTOMER_PHOTOS.map((p) =>
      `<figure><img src="${p.img}" alt="Foto pelanggan ${esc(p.caption || "")}" loading="lazy"><figcaption>${esc(p.caption || "")}</figcaption></figure>`).join("")}</div>`;
  } else {
    ugc.remove();
  }

  // ---------- kontak ----------
  $("#waBtn").href = linkKlik("wa-kontak");
  $("#igBtn").href = linkKlik("instagram");
  $("#ytBtn").href = linkKlik("youtube");
  $("#ttBtn").href = linkKlik("tiktok");
  $("#orderSteps").innerHTML = ORDER_STEPS.map((s, i) => `<li><span class="steps__n">${i + 1}</span><div><strong>${esc(s.title)}</strong><p>${esc(s.text)}</p></div></li>`).join("");
  $("#shipping").innerHTML = SHIPPING.map((s) => `<li><span>${esc(s.label)}</span><strong>${todo(s.value)}</strong></li>`).join("");
  $("#year").textContent = new Date().getFullYear();

  // ---------- animasi muncul saat scroll ----------
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); reveal.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

  // ---------- parallax foto hero ----------
  const par = [...document.querySelectorAll("[data-parallax]")];
  if (!reduce && par.length) {
    let ticking = false;
    const run = () => {
      const y = window.scrollY;
      par.forEach((el) => { el.style.setProperty("--py", (y * parseFloat(el.dataset.parallax)).toFixed(1) + "px"); });
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
  }
  document.body.classList.add("ready");
})();
