(function () {
  document.documentElement.classList.add('js');

  var WA = '6289514060139';
  var pages = [
    ['index', 'Home'], ['about', 'About'], ['services', 'Services'],
    ['pricing', 'Pricing'], ['gallery', 'Gallery'], ['contact', 'Contact']
  ];
  var current = document.body.getAttribute('data-page') || '';

  var links = pages.map(function (p) {
    return '<li><a href="' + p[0] + '.html"' + (p[0] === current ? ' class="active"' : '') + '>' + p[1] + '</a></li>';
  }).join('');

  var header =
    '<header class="site-header"><div class="container header-inner">' +
      '<a class="brand" href="index.html">BEKO <span>GARAGE</span></a>' +
      '<button class="menu-toggle" type="button" aria-label="Buka menu" aria-expanded="false">Menu ☰</button>' +
      '<nav class="nav" aria-label="Navigasi utama"><ul class="nav-links">' + links + '</ul>' +
      '<a class="btn btn-primary" href="registration.html">Booking Now</a></nav>' +
    '</div></header>';

  var footLinks = pages.map(function (p) {
    return '<li><a href="' + p[0] + '.html">' + p[1] + '</a></li>';
  }).join('');

  var footer =
    '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
        '<div><div class="footer-brand">BEKO <span>GARAGE</span></div><p>Custom Painting &amp; Body Work. Pengecatan ulang dan custom painting untuk motor serta sepeda kalcer.</p></div>' +
        '<div><h4>Menu</h4><ul class="footer-links">' + footLinks + '</ul></div>' +
        '<div><h4>Kontak</h4><ul class="footer-links">' +
          '<li>Jalan Walisongo, Gang 3, Rembun Lor, Siwalan, Kabupaten Pekalongan, Jawa Tengah</li>' +
          '<li><a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">WhatsApp 0895-1406-0139</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' Beko Garage. All Rights Reserved.</span><span>Paint your style.</span></div>' +
    '</div></footer>' +
    '<a class="wa-float" href="https://wa.me/' + WA + '" target="_blank" rel="noopener" aria-label="Chat WhatsApp">Chat WhatsApp</a>';

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Animasi muncul saat scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Form booking -> WhatsApp
  var form = document.querySelector('#booking-form');
  if (form) {
    var pre = new URLSearchParams(window.location.search).get('service');
    var sel = form.querySelector('#service');
    if (pre && sel) {
      Array.prototype.forEach.call(sel.options, function (o) { if (o.value === pre) sel.value = pre; });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var err = document.querySelector('#form-error');
      var digits = String(d.get('phone') || '').replace(/\D/g, '');
      if (digits.length < 9) {
        err.textContent = 'Nomor WhatsApp belum valid. Contoh: 08123456789';
        return;
      }
      err.textContent = '';

      var msg = [
        'Halo Beko Garage, saya ingin melakukan booking.', '',
        'Nama: ' + d.get('name'),
        'Nomor WhatsApp: ' + d.get('phone'),
        'Jenis kendaraan: ' + d.get('vehicle'),
        'Layanan: ' + d.get('service'),
        'Warna/konsep: ' + (d.get('color') || '-'),
        'Catatan: ' + (d.get('details') || '-')
      ].join('\n');

      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();