/* ============================================
   Arbeitsproben – gemeinsame Helfer
   Sprache (sj_lang wie auf der restlichen Website),
   Texte über data-t, Zahlenformat, Firmenlogo-Ersatz
   ============================================ */
(function () {
  var AP = window.AP = { lang: 'de', T: { de: {}, en: {} }, renderers: [], titles: null };

  AP.$ = function (id) { return document.getElementById(id); };
  AP.t = function (k) { var d = AP.T[AP.lang]; return d && d[k] !== undefined ? d[k] : k; };
  AP.L = function (o) { return o && typeof o === 'object' && (o.de !== undefined || o.en !== undefined) ? o[AP.lang] : o; };
  AP.num = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '’'); };
  AP.dec = function (n, d) { return Number(n).toFixed(d === undefined ? 1 : d); };
  AP.fill = function (s, o) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] !== undefined ? o[k] : m; }); };

  function applyT() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-t]'), function (el) {
      var k = el.getAttribute('data-t'), d = AP.T[AP.lang];
      if (d[k] !== undefined) el.innerHTML = d[k];
    });
    document.documentElement.lang = AP.lang;
    if (AP.titles) document.title = AP.titles[AP.lang];
    var de = AP.$('btn-de'), en = AP.$('btn-en');
    if (de) de.className = AP.lang === 'de' ? 'on' : '';
    if (en) en.className = AP.lang === 'en' ? 'on' : '';
  }

  AP.render = function () {
    applyT();
    AP.renderers.forEach(function (fn) { fn(); });
  };

  AP.setLang = function (l) {
    AP.lang = l === 'en' ? 'en' : 'de';
    try { localStorage.setItem('sj_lang', AP.lang); } catch (e) {}
    AP.render();
  };
  window.setLang = AP.setLang;

  /* Seite meldet Texte und Zeichenfunktionen an, dann einmal zeichnen */
  AP.init = function (T, renderers, titles) {
    AP.T = T;
    AP.renderers = renderers || [];
    AP.titles = titles || null;
    try { if (localStorage.getItem('sj_lang') === 'en') AP.lang = 'en'; } catch (e) {}
    AP.render();
  };

  /* Firmenlogo: fehlt die Datei, erscheint der Firmenname als Schriftzug */
  AP.logoFail = function (img) { if (img && img.parentNode) img.parentNode.classList.add('nologo'); };
})();
