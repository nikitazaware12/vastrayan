/* Shared header, footer, enquiry modal and floating WhatsApp button.
   Edit nav links / footer here once – applies to every page. */
(function () {
  document.documentElement.classList.add("js");
  const S = window.SITE;
  const pages = [
    ["index.html", "Home"],
    ["about.html", "About"],
    ["collections.html", "Collections"],
    ["services.html", "Services"],
    ["manufacturing.html", "Manufacturing"],
    ["contact.html", "Contact"],
  ];
  const cur = location.pathname.split("/").pop() || "index.html";

  const ico = {
    wa: '<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.6-4.8A9 9 0 1 1 8 19.6L3 21Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.9.7a3.5 3.5 0 0 1-1.6-1.6l.7-.9-1-2L9 9.5Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  };

  const logo = `
    <a href="index.html" class="flex items-center gap-2.5" aria-label="${S.brand} home">
      <svg viewBox="0 0 40 40" class="h-9 w-9" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="#e60023"/>
        <g fill="#fff"><rect x="8" y="8" width="10" height="10" rx="3"/><rect x="22" y="22" width="10" height="10" rx="3"/></g>
        <g fill="#f7f2ea" opacity=".55"><rect x="22" y="8" width="10" height="10" rx="3"/><rect x="8" y="22" width="10" height="10" rx="3"/></g>
      </svg>
      <span class="leading-none"><span class="block font-display text-xl font-semibold text-ink">Vastrayan</span><span class="block text-[10px] font-bold uppercase tracking-[.32em] text-mocha">Textiles</span></span>
    </a>`;

  /* dropdown menus (desktop) + accordions (mobile) */
  const menus = {
    "collections.html": [
      ["collections.html#fabric", "Fabrics", "Woven, handloom, printed, silk"],
      ["collections.html#ethnic", "Ethnic Wear", "Kurtas, tunics, indo-western"],
      ["collections.html#casual", "Casual Wear", "Linen, knitwear, everyday"],
      ["collections.html#kids", "Kidswear", "Soft and colourful"],
      ["collections.html#yarn", "Yarn & Wool", "Cones, dyed and craft yarn"],
    ],
    "services": [
      ["services.html#svc-fabric", "Fabric Manufacturing", "Weaving and knitting"],
      ["services.html#svc-dyeing", "Dyeing & Printing", "Lab-matched shades, block prints"],
      ["services.html#svc-garments", "Garment Stitching", "Cut, stitch and finish"],
      ["services.html#svc-embroidery", "Embroidery & Handcraft", "Thread work and handloom"],
      ["services.html#svc-private", "Private Label & Custom", "Your design, your label"],
      ["services.html#svc-packing", "Quality & Packing", "Inspection and dispatch"],
    ],
  };
  const chev = '<svg viewBox="0 0 24 24" class="h-3.5 w-3.5 transition-transform duration-300 chev" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  const panel = (items, wide) => `<div class="dd-panel ${wide ? "w-[26rem]" : "w-72"}"><ul class="${wide ? "grid grid-cols-2 gap-1" : "grid gap-1"}">${items.map(([h, t, d]) => `<li><a href="${h}" class="dd-item"><span class="dd-dot"></span><span><span class="block text-sm font-semibold text-ink">${t}</span><span class="block text-xs text-cocoa/70">${d}</span></span></a></li>`).join("")}</ul></div>`;
  const dd = (href, label, items, wide, active) => `<div class="dd relative"><a href="${href}" class="nav-link inline-flex items-center gap-1 ${active ? "active" : ""}" ${active ? 'aria-current="page"' : ""} aria-haspopup="true">${label}${chev}</a>${panel(items, wide)}</div>`;
  const navLinks = [
    `<a href="index.html" class="nav-link ${cur === "index.html" ? "active" : ""}" ${cur === "index.html" ? 'aria-current="page"' : ""}>Home</a>`,
    `<a href="about.html" class="nav-link ${cur === "about.html" ? "active" : ""}" ${cur === "about.html" ? 'aria-current="page"' : ""}>About</a>`,
    dd("collections.html", "Collections", menus["collections.html"], false, cur === "collections.html"),
    dd("services.html", "Services", menus.services, true, cur === "services.html"),
    `<a href="manufacturing.html" class="nav-link ${cur === "manufacturing.html" ? "active" : ""}" ${cur === "manufacturing.html" ? 'aria-current="page"' : ""}>Manufacturing</a>`,
    `<a href="contact.html" class="nav-link ${cur === "contact.html" ? "active" : ""}" ${cur === "contact.html" ? 'aria-current="page"' : ""}>Contact</a>`,
  ].join("");
  const mobItem = (h, t, on) => `<a href="${h}" class="rounded-xl px-4 py-3 font-semibold ${on ? "bg-thread text-white" : "text-cocoa hover:bg-linen"}">${t}</a>`;
  const mobGroup = (label, href, items) => `<details class="group-m rounded-xl"><summary class="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 font-semibold text-cocoa hover:bg-linen">${label}${chev}</summary><div class="ml-4 grid border-l-2 border-sand pl-2"><a href="${href}" class="rounded-lg px-3 py-2 text-sm font-semibold text-thread">All ${label.toLowerCase()}</a>${items.map(([h, t]) => `<a href="${h}" class="rounded-lg px-3 py-2 text-sm text-cocoa hover:bg-linen">${t}</a>`).join("")}</div></details>`;
  const mobLinks = [
    mobItem("index.html", "Home", cur === "index.html"),
    mobItem("about.html", "About", cur === "about.html"),
    mobGroup("Collections", "collections.html", menus["collections.html"]),
    mobGroup("Services", "services.html", menus.services),
    mobItem("manufacturing.html", "Manufacturing", cur === "manufacturing.html"),
    mobItem("contact.html", "Contact", cur === "contact.html"),
  ].join("");

  const header = `
  <header id="site-header" class="sticky top-0 z-50 bg-cream/85 backdrop-blur-md transition-shadow">
    <div class="container-x flex h-16 items-center justify-between">
      ${logo}
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Main">${navLinks}</nav>
      <div class="flex items-center gap-2">
        <button type="button" data-open-enquiry class="btn-primary hidden !py-2 sm:inline-flex">${ico.wa}<span>Send Enquiry</span></button>
        <button id="menuBtn" type="button" class="grid h-10 w-10 place-items-center rounded-full border border-cocoa/20 lg:hidden" aria-label="Menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <div class="swatch-strip"></div>
    <div id="mobileNav" class="hidden border-t border-cocoa/10 bg-cream lg:hidden">
      <div class="container-x flex flex-col gap-1 py-3">${mobLinks}
        <button type="button" data-open-enquiry class="btn-primary mt-2">${ico.wa}<span>Send Enquiry on WhatsApp</span></button>
      </div>
    </div>
  </header>`;

  const footer = `
  <footer class="bg-cocoa text-cream/80">
    <div class="swatch-strip"></div>
    <div class="container-x flex flex-col items-center justify-between gap-3 py-5 text-sm md:flex-row">
      <a href="index.html" class="flex items-center gap-3" aria-label="${S.brand} home">
        <svg viewBox="0 0 40 40" class="h-8 w-8" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#e60023"/><g fill="#fff"><rect x="8" y="8" width="10" height="10" rx="3"/><rect x="22" y="22" width="10" height="10" rx="3"/></g><g fill="#f7f2ea" opacity=".55"><rect x="22" y="8" width="10" height="10" rx="3"/><rect x="8" y="22" width="10" height="10" rx="3"/></g></svg>
        <span class="font-display text-lg font-semibold text-white">Vastrayan <span class="text-sand">Textiles</span></span>
        <span class="hidden text-cream/70 lg:inline">· The journey of cloth</span>
      </a>
      <nav class="flex flex-wrap justify-center gap-x-5 gap-y-1 font-medium">
        ${pages.map(([h, t]) => `<a href="${h}" class="transition hover:text-white">${t}</a>`).join("")}
      </nav>
      <div class="flex items-center gap-3">
        <a href="tel:+${S.whatsapp}" class="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-thread hover:text-white" aria-label="Call">${ico.phone}</a>
        <a href="mailto:${S.email}" class="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-thread hover:text-white" aria-label="Email">${ico.mail}</a>
        <a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener" class="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-[#1fa855] hover:text-white" aria-label="WhatsApp">${ico.wa}</a>
      </div>
    </div>
    <div class="border-t border-white/10 py-2 text-center text-xs text-cream/70">© <span id="yr"></span> ${S.brand}. All rights reserved.</div>
  </footer>`;

  const products = ["Woven Fabrics","Printed Fabrics","Handloom & Embroidered","Ethnic Wear","Indo-Western","Linen & Casual Wear","Knitwear","Kidswear","Yarn & Wool","Garment Stitching","Embroidery & Handcraft","Private Label / Custom","Other"];
  const modal = `
  <div id="enqModal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="enqTitle" aria-hidden="true">
    <div data-close-enquiry class="absolute inset-0 bg-ink/60 backdrop-blur-sm"></div>
    <div class="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-cream p-6 shadow-lift sm:p-7">
      <div class="swatch-bar mb-4"></div>
      <button type="button" data-close-enquiry class="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-linen text-cocoa transition hover:bg-thread hover:text-white" aria-label="Close">✕</button>
      <h2 id="enqTitle" class="font-display text-2xl font-semibold">Send Enquiry</h2>
      <p class="mb-4 mt-1 text-sm text-cocoa/70">Fill the details – your message opens in WhatsApp, ready to send.</p>
      <form data-wa-form class="grid gap-3 sm:grid-cols-2">
        <div><label class="label" for="m-name">Your name *</label><input id="m-name" name="Name" required class="field" placeholder="Full name"></div>
        <div><label class="label" for="m-phone">Phone</label><input id="m-phone" name="Phone" type="tel" class="field" placeholder="+91 …"></div>
        <div><label class="label" for="m-prod">Interested in</label><select id="m-prod" name="Interested in" class="field">${products.map(p => `<option>${p}</option>`).join("")}</select></div>
        <div><label class="label" for="m-qty">Quantity</label><input id="m-qty" name="Quantity" class="field" placeholder="e.g. 500 metres / 300 pcs"></div>
        <div class="sm:col-span-2"><label class="label" for="m-msg">Message</label><textarea id="m-msg" name="Message" rows="3" class="field" placeholder="Fabric type, colours, sizes, delivery date…"></textarea></div>
        <button class="btn-wa sm:col-span-2" type="submit">${ico.wa}<span>Send on WhatsApp</span></button>
      </form>
    </div>
  </div>
  <a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" class="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#1fa855] text-white shadow-lift transition hover:scale-110">${ico.wa}</a>`;

  const h = document.getElementById("site-header");
  if (h) h.outerHTML = header;
  const f = document.getElementById("site-footer");
  if (f) f.outerHTML = footer;
  document.body.insertAdjacentHTML("beforeend", modal);
  const yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();
})();
