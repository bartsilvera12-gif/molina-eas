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

  /* ---- Stylized SVG illustrations per property type ---- */
  var ILLUST = {
    mansion: '<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 118 L180 118"/><path d="M40 118 L40 75 L100 38 L160 75 L160 118"/><path d="M35 78 L100 35 L165 78"/><path d="M80 118 L80 90 M90 118 L90 90 M110 118 L110 90 M120 118 L120 90"/><path d="M75 90 L125 90"/><rect x="52" y="86" width="14" height="18"/><rect x="134" y="86" width="14" height="18"/><path d="M94 118 L94 100 L106 100 L106 118"/></svg>',
    ranch: '<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 118 L180 118"/><path d="M20 125 L180 125 M40 125 L40 132 M70 125 L70 132 M100 125 L100 132 M130 125 L130 132 M160 125 L160 132"/><path d="M50 118 L50 78 L75 58 L120 58 L120 118"/><path d="M45 80 L75 56 L122 56"/><path d="M75 118 L75 88 L95 88 L95 118 M85 88 L85 118"/><path d="M140 118 L140 48 L160 48 L160 118"/><path d="M138 50 Q150 40 162 50"/><path d="M150 40 L150 32"/></svg>',
    penthouse: '<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 128 L180 128"/><path d="M70 128 L70 30 L130 30 L130 128"/><path d="M70 50 L130 50 M70 68 L130 68 M70 86 L130 86 M70 104 L130 104"/><path d="M100 30 L100 128"/><path d="M88 30 L88 22 L112 22 L112 30"/><path d="M100 22 L100 12"/></svg>',
    cabin: '<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 122 L180 122"/><path d="M30 122 L30 88 M18 100 L30 88 L42 100 M30 88 L30 80 M22 92 L30 82 L38 92"/><path d="M170 122 L170 86 M158 98 L170 86 L182 98 M170 86 L170 78 M162 90 L170 80 L178 90"/><path d="M65 122 L65 76 L100 50 L135 76 L135 122 Z"/><path d="M58 78 L100 46 L142 78"/><path d="M92 122 L92 96 L108 96 L108 122"/><path d="M118 70 L118 50 L128 50 L128 78"/><rect x="74" y="86" width="11" height="11"/><rect x="115" y="86" width="11" height="11"/></svg>',
    tower: '<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 130 L185 130"/><path d="M50 130 L50 22 L100 22 L100 130"/><path d="M100 130 L100 48 L150 48 L150 130"/><path d="M50 42 L100 42 M50 62 L100 62 M50 82 L100 82 M50 102 L100 102"/><path d="M100 68 L150 68 M100 88 L150 88 M100 108 L150 108"/><path d="M65 22 L65 130 M82 22 L82 130 M117 48 L117 130 M133 48 L133 130"/></svg>',
    lake: '<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M25 78 L60 48 L95 78"/><path d="M85 82 L125 54 L165 82"/><circle cx="155" cy="38" r="6"/><path d="M82 96 L82 76 L100 58 L118 76 L118 96"/><path d="M76 78 L100 56 L124 78"/><path d="M88 96 L88 88 L112 88 L112 96"/><path d="M86 96 L86 104 M114 96 L114 104"/><path d="M20 112 Q40 107 60 112 T100 112 T140 112 T180 112"/><path d="M20 122 Q40 117 60 122 T100 122 T140 122 T180 122"/><path d="M20 132 Q40 127 60 132 T100 132 T140 132 T180 132"/></svg>'
  };

  /* ---- Scroll-to-top button ---- */
  var scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    var stTicking = false;
    function updateScrollTop() {
      if (window.scrollY > 400) scrollTopBtn.classList.add("show");
      else scrollTopBtn.classList.remove("show");
      stTicking = false;
    }
    window.addEventListener("scroll", function () {
      if (stTicking) return;
      stTicking = true;
      requestAnimationFrame(updateScrollTop);
    }, { passive: true });
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    updateScrollTop();
  }

  /* ---- Properties data ---- */
  var PROPS = [
    { cat: "residencial", badge: "Residencia premium", op: "Venta", loc: "Asunción · Carmelitas", title: "Residencia de autor con jardín privado", price: "USD 1.250.000", beds: "5 dorm.", area: "620 m²", illust: "mansion" },
    { cat: "rural", badge: "Estancia agropecuaria", op: "Venta", loc: "Chaco · Boquerón", title: "Estancia ganadera con casco e infraestructura", price: "Consultar", beds: "1.800 ha", area: "Productiva", illust: "ranch" },
    { cat: "urbano", badge: "Departamento urbano", op: "Venta / Alquiler", loc: "Asunción · Villa Morra", title: "Penthouse panorámico en torre premium", price: "USD 480.000", beds: "3 dorm.", area: "210 m²", illust: "penthouse" },
    { cat: "rural", badge: "Casa de campo", op: "Venta", loc: "Cordillera · Atyrá", title: "Casa de campo con monte nativo y arroyo", price: "USD 320.000", beds: "4 dorm.", area: "3 ha", illust: "cabin" },
    { cat: "inversion", badge: "Propiedad de inversión", op: "Inversión", loc: "Ciudad del Este · Centro", title: "Edificio de renta con ocupación plena", price: "USD 2.100.000", beds: "Renta", area: "1.400 m²", illust: "tower" },
    { cat: "residencial", badge: "Luna de miel", op: "Alquiler vacacional", loc: "Itapúa · San Bernardino", title: "Refugio frente al lago para estadías premium", price: "Consultar", beds: "2 dorm.", area: "Vista lago", illust: "lake" },
    { cat: "residencial", badge: "Quinta familiar", op: "Venta", loc: "Central · Areguá", title: "Quinta de descanso con piscina y arboleda", price: "USD 380.000", beds: "4 dorm.", area: "800 m²", illust: "cabin" },
    { cat: "inversion", badge: "Local comercial", op: "Alquiler", loc: "Asunción · World Trade Center", title: "Oficinas premium en torre corporativa", price: "USD 4.500 / mes", beds: "Comercial", area: "180 m²", illust: "tower" },
    { cat: "rural", badge: "Hacienda colonial", op: "Venta", loc: "Misiones · Santa Rosa", title: "Hacienda histórica con casona y campo productivo", price: "USD 1.800.000", beds: "1.200 ha", area: "Productiva", illust: "ranch" }
  ];

  var ICON_BED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18h18"/><path d="M7 10V8a1 1 0 0 1 1-1h3v3"/></svg>';
  var ICON_AREA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 4h16v16H4z"/><path d="M4 9h5M4 15h5M15 4v5M15 15v5"/></svg>';
  var ICON_PIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-5-7-11a7 7 0 0 1 14 0c0 6-7 11-7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>';

  function cardHTML(p) {
    return (
      '<article class="prop-card reveal" data-cat="' + p.cat + '">' +
        '<div class="prop-media">' +
          '<span class="prop-badge">' + p.badge + '</span>' +
          '<span class="prop-op">' + p.op + '</span>' +
          '<div class="prop-illust">' + ILLUST[p.illust] + '</div>' +
          '<span class="prop-shine"></span>' +
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
  }

  /* ---- Home: carousel ---- */
  var track = document.getElementById("propGrid");
  if (track) {
    var viewport = track.parentElement;
    var prevBtn = document.getElementById("propPrev");
    var nextBtn = document.getElementById("propNext");
    var PER_PAGE = 3;
    var GAP = 26;
    var page = 0;
    var pages = 1;
    var autoTimer = null;
    var AUTO_MS = 5000;

    var computePerPage = function () {
      var w = window.innerWidth;
      if (w <= 720) return 1;
      if (w <= 980) return 2;
      return 3;
    };

    var render = function () {
      track.innerHTML = PROPS.map(cardHTML).join("");
      PER_PAGE = computePerPage();
      pages = Math.max(1, Math.ceil(PROPS.length / PER_PAGE));
      page = 0;
      layout();
      update();
      observeReveals();
    };

    var layout = function () {
      var vw = viewport.clientWidth;
      var cardW = (vw - (PER_PAGE - 1) * GAP) / PER_PAGE;
      var cards = track.querySelectorAll(".prop-card");
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.width = cardW + "px";
        var isPageEnd = (i % PER_PAGE) === (PER_PAGE - 1);
        cards[i].style.marginRight = isPageEnd ? "0px" : GAP + "px";
      }
    };

    var update = function () {
      var vw = viewport.clientWidth;
      track.style.transform = "translateX(-" + (page * vw) + "px)";
    };

    var next = function () { page = (page + 1) % pages; update(); };
    var prev = function () { page = (page - 1 + pages) % pages; update(); };
    var startAuto = function () { stopAuto(); if (pages > 1) autoTimer = setInterval(next, AUTO_MS); };
    var stopAuto = function () { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } };

    window.addEventListener("resize", function () {
      var newPerPage = computePerPage();
      if (newPerPage !== PER_PAGE) {
        PER_PAGE = newPerPage;
        pages = Math.max(1, Math.ceil(PROPS.length / PER_PAGE));
        page = Math.min(page, pages - 1);
      }
      layout();
      update();
    });
    nextBtn.addEventListener("click", function () { next(); startAuto(); });
    prevBtn.addEventListener("click", function () { prev(); startAuto(); });
    var carouselWrap = document.querySelector(".prop-carousel");
    carouselWrap.addEventListener("mouseenter", stopAuto);
    carouselWrap.addEventListener("mouseleave", startAuto);

    render();
    startAuto();
  }

  /* ---- Catálogo completo: full grid + filters + search ---- */
  var catalogGrid = document.getElementById("catalogGrid");
  if (catalogGrid) {
    var searchInput = document.getElementById("catalogSearch");
    var filtersEl = document.getElementById("catalogFilters");
    var opSelect = document.getElementById("catalogOp");
    var countEl = document.getElementById("catalogCount");
    var emptyEl = document.getElementById("catalogEmpty");

    var state = { q: "", cat: "all", op: "all" };

    // Leer filtros desde la URL (?cat=...&op=...&q=...)
    var params = new URLSearchParams(window.location.search);
    var urlCat = params.get("cat");
    var urlOp = params.get("op");
    var urlQ = params.get("q");
    if (urlCat) state.cat = urlCat;
    if (urlOp) state.op = urlOp;
    if (urlQ) state.q = urlQ;

    // Sincronizar UI con el estado inicial
    if (urlCat) {
      filtersEl.querySelectorAll(".cat-filter").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-cat") === urlCat);
      });
    }
    if (urlOp) opSelect.value = urlOp;
    if (urlQ) searchInput.value = urlQ;

    function normalize(s) {
      return (s || "").toString().toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "");
    }

    function matchOp(propOp, opFilter) {
      if (opFilter === "all") return true;
      var po = normalize(propOp);
      if (opFilter === "venta") return po.indexOf("venta") !== -1;
      if (opFilter === "alquiler") return po.indexOf("alquiler") !== -1;
      if (opFilter === "inversion") return po.indexOf("inversion") !== -1;
      return true;
    }

    function applyFilters() {
      var q = normalize(state.q);
      var list = PROPS.filter(function (p) {
        if (state.cat !== "all" && p.cat !== state.cat) return false;
        if (!matchOp(p.op, state.op)) return false;
        if (q) {
          var hay = normalize(p.title + " " + p.loc + " " + p.badge + " " + p.op);
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      });
      catalogGrid.innerHTML = list.map(cardHTML).join("");
      countEl.textContent = list.length === 1
        ? "1 propiedad"
        : list.length + " propiedades";
      emptyEl.hidden = list.length !== 0;
      catalogGrid.hidden = list.length === 0;
      observeReveals();
    }

    searchInput.addEventListener("input", function (e) {
      state.q = e.target.value;
      applyFilters();
    });

    filtersEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".cat-filter");
      if (!btn) return;
      filtersEl.querySelectorAll(".cat-filter").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      state.cat = btn.getAttribute("data-cat");
      applyFilters();
    });

    opSelect.addEventListener("change", function (e) {
      state.op = e.target.value;
      applyFilters();
    });

    applyFilters();
  }

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
