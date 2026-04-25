(function () {
  'use strict';

  /* Build address from string fragments into DOM element.
   * Pipe '|' marks a line break. Silently skips unknown IDs. */
  function _b(id, frags) {
    var el = document.getElementById(id);
    if (!el) return;
    var lines = frags.join('').split('|');
    var frag = document.createDocumentFragment();
    lines.forEach(function (line, i) {
      if (i > 0) frag.appendChild(document.createElement('br'));
      frag.appendChild(document.createTextNode(line));
    });
    el.appendChild(frag);
  }

  function _v() {
    document.querySelectorAll('[data-user][data-domain]').forEach(function (el) {
      var u = el.getAttribute('data-user');
      var d = el.getAttribute('data-domain');
      if (!u || !d) return;
      var addr = u + '\x40' + d;
      var val = el.querySelector('.contact-value');
      if (val) val.textContent = addr;
      if (el.tagName.toLowerCase() === 'a') el.setAttribute('href', 'mail' + 'to:' + addr);
      el.setAttribute('aria-label', 'E-Mail: ' + addr);
    });

    document.querySelectorAll('[data-tel]').forEach(function (el) {
      var tel = el.getAttribute('data-tel');
      var disp = el.getAttribute('data-tel-display') || tel;
      if (!tel) return;
      var val = el.querySelector('.contact-value');
      if (val) val.textContent = disp;
      var href = 'tel:' + tel.replace(/[\s/]/g, '');
      if (el.tagName.toLowerCase() === 'a') {
        el.setAttribute('href', href);
      } else {
        el.addEventListener('click', function () { window.location.href = href; });
      }
      el.setAttribute('aria-label', 'Telefon: ' + disp);
    });

    document.querySelectorAll('[data-url]').forEach(function (el) {
      var url = el.getAttribute('data-url');
      var disp = el.getAttribute('data-display') || url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      if (!url) return;
      var val = el.querySelector('.contact-value');
      if (val) val.textContent = disp;
      if (el.tagName.toLowerCase() === 'a') {
        el.setAttribute('href', url);
        if (el.getAttribute('data-external') === 'true') {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      } else {
        el.addEventListener('click', function () { window.location.href = url; });
      }
      var lbl = el.querySelector('.contact-label');
      el.setAttribute('aria-label', (lbl ? lbl.textContent + ': ' : '') + disp);
    });
  }

  function _init() {
    _v();
    /* Menckestraße 6A · \xdf = ß */
    _b('obf-addr-street', ['Mencke', 'stra\xdfe 6A|', '04155 Leipzig|', 'Deutschland']);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    _init();
  }
}());
