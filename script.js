/* ============================================================
   MOLINA EAS · interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Nav scroll state ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  function toggleMenu() {
    var open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", toggleMenu);
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      burger.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  /* ---- Properties data ---- */
  var PROPS = [
    { cat: "residencial", badge: "Residencia premium", op: "Venta", loc: "Asunción · Carmelitas", title: "Residencia de autor con jardín privado", price: "USD 1.250.000", beds: "5 dorm.", area: "620 m²", ph: "RESIDENCE · EXTERIOR PHOTO" },
    { cat: "rural", badge: "Estancia agropecuaria", op: "Venta", loc: "Chaco · Boquerón", title: "Estancia ganadera con casco e infraestructura", price: "Consultar", beds: "1.800 ha", area: "Productiva", ph: "ESTANCIA · AERIAL PHOTO" },
    { cat: "urbano", badge: "Departamento urbano", op: "Venta / Alquiler", loc: "Asunción · Villa Morra", title: "Penthouse panorámico en torre premium", price: "USD 480.000", beds: "3 dorm.", area: "210 m²", ph: "APARTMENT · INTERIOR PHOTO" },
    { cat: "rural", badge: "Casa de campo", op: "Venta", loc: "Cordillera · Atyrá", title: "Casa de campo con monte nativo y arroyo", price: "USD 320.000", beds: "4 dorm.", area: "3 ha", ph: "COUNTRY HOUSE · PHOTO" },
    { cat: "inversion", badge: "Propiedad de inversión", op: "Inversión", loc: "Ciudad del Este · Centro", title: "Edificio de renta con ocupación plena", price: "USD 2.100.000", beds: "Renta", area: "1.400 m²", ph: "INVESTMENT BUILDING · PHOTO" },
    { cat: "residencial", badge: "Luna de miel", op: "Alquiler vacacional", loc: "Itapúa · San Bernardino", title: "Refugio frente al lago para estadías premium", price: "Consultar", beds: "2 dorm.", area: "Vista lago", ph: "LAKE RETREAT · PHOTO" }
  ];

  var ICON_BED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18h18"/><path d="M7 10V8a1 1 0 0 1 1-1h3v3"/></svg>';
  var ICON_AREA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 4h16v16H4z"/><path d="M4 9h5M4 15h5M15 4v5M15 15v5"/></svg>';
  var ICON_PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>';

  var grid = document.getElementById("propGrid");
  function render() {
    grid.innerHTML = PROPS.map(function (p) {
      return (
        '<article class="prop-card reveal" data-cat="' + p.cat + '">' +
          '<div class="prop-media">' +
            '<span class="prop-badge">' + p.badge + '</span>' +
            '<span class="prop-op">' + p.op + '</span>' +
            '<div class="ph"></div>' +
            '<span class="ph-label">' + p.ph + '</span>' +
          '</div>' +
          '<div class="prop-body">' +
            '<span class="prop-loc">' + ICON_PIN + p.loc + '</span>' +
            '<h3>' + p.title + '</h3>' +
            '<div class="prop-meta"><span>' + ICON_BED + p.beds + '</span><span>' + ICON_AREA + p.area + '</span></div>' +
            '<div class="prop-foot">' +
              '<span class="prop-price">' + p.price + '<small>' + p.op + '</small></span>' +
              '<a class="prop-link" href="#contacto">Ver detalle →</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join("");
    observeReveals();
  }
  render();

  /* ---- Filters ---- */
  var filters = document.getElementById("propFilters");
  filters.addEventListener("click", function (e) {
    var btn = e.target.closest(".prop-filter");
    if (!btn) return;
    filters.querySelectorAll(".prop-filter").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    var f = btn.getAttribute("data-filter");
    grid.querySelectorAll(".prop-card").forEach(function (card) {
      var show = f === "all" || card.getAttribute("data-cat") === f;
      card.classList.toggle("hide", !show);
    });
  });

  /* ---- Scroll reveal (rAF + scroll based — robust across all environments) ---- */
  function revealVisible() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    var trigger = window.innerHeight * 0.92;
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.top < trigger && r.bottom > 0) els[i].classList.add("in");
    }
  }
  function observeReveals() {
    revealVisible();
  }
  var ticking = false;
  function onScrollReveal() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { revealVisible(); ticking = false; });
  }
  window.addEventListener("scroll", onScrollReveal, { passive: true });
  window.addEventListener("resize", onScrollReveal, { passive: true });
  window.addEventListener("load", revealVisible);
  // initial passes (cover late layout / font load)
  revealVisible();
  setTimeout(revealVisible, 60);
  setTimeout(revealVisible, 300);
})();
