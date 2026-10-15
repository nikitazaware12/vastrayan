(function () {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* mobile menu */
  const mb = $("#menuBtn"), mn = $("#mobileNav");
  if (mb) mb.addEventListener("click", () => {
    const open = mn.classList.toggle("hidden") === false;
    mb.setAttribute("aria-expanded", open);
  });
  /* header shadow on scroll */
  const hd = $("#site-header");
  const onScroll = () => hd && hd.classList.toggle("shadow-soft", window.scrollY > 10);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  /* enquiry modal */
  const modal = $("#enqModal");
  let lastFocus = null;
  const openModal = (product) => {
    lastFocus = document.activeElement; modal.setAttribute("aria-hidden", "false");
    if (product) { const sel = $("#m-prod"); if (sel) { [...sel.options].forEach(o => { if (o.text === product) sel.value = o.text; }); } }
    modal.classList.remove("hidden"); modal.classList.add("flex");
    document.body.style.overflow = "hidden";
    setTimeout(() => $("#m-name") && $("#m-name").focus(), 50);
  };
  const closeModal = () => { modal.setAttribute("aria-hidden", "true"); if (lastFocus && lastFocus.focus) lastFocus.focus(); modal.classList.add("hidden"); modal.classList.remove("flex"); document.body.style.overflow = ""; };
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open-enquiry]");
    if (o) { e.preventDefault(); openModal(o.dataset.product); }
    if (e.target.closest("[data-close-enquiry]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    /* keyboard: Enter / Space on product tags */
    const tag = e.target.closest && e.target.closest(".tag-wrap[role=button]");
    if (tag && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openModal(tag.dataset.product); }
    /* focus trap inside modal */
    if (e.key === "Tab" && !modal.classList.contains("hidden")) {
      const f = $$("button, input, select, textarea, a[href]", modal).filter(x => !x.disabled && x.offsetParent !== null);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* every enquiry form -> WhatsApp message */
  $$("form[data-wa-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const lines = [`Hello ${S.brand}, I would like to send an enquiry.`, ""];
      new FormData(form).forEach((v, k) => {
        let val = String(v).trim(); if (!val) return;
        if (/^\d{4}-\d{2}-\d{2}$/.test(val)) val = new Date(val + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        lines.push(`*${k}:* ${val}`);
      });
      const url = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
      const w = window.open(url, "_blank", "noopener");
      if (!w) window.location.href = url; /* popup blocked -> same tab */
      if (form.closest("#enqModal")) closeModal();
    });
  });

  /* scroll reveal */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((en) => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 }) : null;
  $$(".reveal").forEach((el) => io ? io.observe(el) : el.classList.add("in"));

  /* collection filter */
  const chips = $$("[data-filter]");
  if (chips.length) chips.forEach((c) => c.addEventListener("click", () => {
    chips.forEach(x => { x.classList.toggle("active", x === c); x.setAttribute("aria-pressed", x === c); });
    const f = c.dataset.filter;
    $$("[data-cat]").forEach((card) => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("hidden", !show);
      if (show) { card.classList.remove("in"); void card.offsetWidth; card.classList.add("in"); }
    });
  }));

  /* open a collection category from a link like collections.html#ethnic */
  const applyHash = () => { const h = location.hash.slice(1); const c = chips.find(x => x.dataset.filter === h); if (c) c.click(); };
  if (chips.length) { applyHash(); window.addEventListener("hashchange", applyHash); }

  /* dropdown: tap to open on touch screens */
  $$(".dd > a").forEach((a) => a.addEventListener("click", (e) => {
    if (window.matchMedia("(hover: none)").matches && !a.parentElement.classList.contains("open")) { e.preventDefault(); $$(".dd.open").forEach(d => d.classList.remove("open")); a.parentElement.classList.add("open"); }
  }));
  document.addEventListener("click", (e) => { if (!e.target.closest(".dd")) $$(".dd.open").forEach(d => d.classList.remove("open")); });

  /* hero fabric strips */
  const strips = $$("#heroStrips .strip");
  if (strips.length) {
    let i = 0, timer;
    const show = (n) => { i = n; strips.forEach((s, k) => s.classList.toggle("is-active", k === n)); };
    const start = () => { clearInterval(timer); timer = setInterval(() => show((i + 1) % strips.length), 3800); };
    strips.forEach((s, k) => { ["mouseenter", "focus", "click"].forEach(ev => s.addEventListener(ev, () => { show(k); clearInterval(timer); })); s.addEventListener("mouseleave", start); });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) start();
  }

  /* date field: no past dates */
  $$("input[data-min-today]").forEach((el) => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); el.min = d.toISOString().slice(0, 10); });

  /* subtle 3D tilt */
  $$(".tilt").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });
})();

/* fill contact details from config.js */
(function () {
  const S = window.SITE;
  document.querySelectorAll("[data-site]").forEach((el) => (el.textContent = S[el.dataset.site] || ""));
  document.querySelectorAll("[data-wa-link]").forEach((el) => (el.href = "https://wa.me/" + S.whatsapp));
  document.querySelectorAll('[data-site-href="tel"]').forEach((el) => (el.href = "tel:+" + S.whatsapp));
  const q = encodeURIComponent(S.mapQuery || S.address);
  const mf = document.getElementById("mapFrame"); if (mf) mf.src = "https://www.google.com/maps?q=" + q + "&output=embed";
  const ml = document.getElementById("mapLink"); if (ml) ml.href = "https://www.google.com/maps/search/?api=1&query=" + q;
  document.querySelectorAll('[data-site-href="mail"]').forEach((el) => (el.href = "mailto:" + S.email));
})();
