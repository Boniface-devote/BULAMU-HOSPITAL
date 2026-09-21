/* Bulamu Hospital Masaka - shared app logic
   Provides renderers, header/footer behavior, modals, lightbox, clock, reveal, FAQ, form. */
(function () {
  'use strict';

  const $ = (s, root) => (root || document).querySelector(s);
  const $$ = (s, root) => Array.from((root || document).querySelectorAll(s));

  const D = window.BULAMU_DATA || { DEPARTMENTS: [], DOCTORS: [], ARTICLES: [], GALLERY: [] };

  /* ============ Toast ============ */
  function toast(msg, icon) {
    const wrap = $('#toastWrap');
    if (!wrap) return;
    icon = icon || 'circle-check';
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<i class="fa-solid fa-' + icon + '"></i><p>' + msg + '</p>';
    wrap.appendChild(t);
    setTimeout(() => t.classList.add('out'), 3800);
    setTimeout(() => t.remove(), 4400);
  }

  /* ============ Header / drawer / scroll spy ============ */
  function initHeader() {
    const navToggle = $('#navToggle');
    const header = $('#siteHeader');
    const toTop = $('#toTop');

    function toggleNav(force) {
      const open = typeof force === 'boolean' ? force : !document.body.classList.contains('nav-open');
      document.body.classList.toggle('nav-open', open);
      if (navToggle) navToggle.setAttribute('aria-expanded', open);
    }

    if (navToggle) navToggle.addEventListener('click', () => toggleNav());
    const overlay = $('#overlay');
    if (overlay) overlay.addEventListener('click', () => toggleNav(false));
    $$('.drawer a').forEach(a => a.addEventListener('click', () => toggleNav(false)));

    window.addEventListener('scroll', () => {
      if (header) header.classList.toggle('scrolled', window.scrollY > 10);
      if (toTop) toTop.classList.toggle('show', window.scrollY > 700);
    }, { passive: true });

    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* Scroll spy for nav highlighting across pages */
    const path = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-link').forEach(l => {
      const href = l.getAttribute('href') || '';
      const target = href.split('/').pop();
      if (target === path) l.classList.add('active');
      else if (!l.classList.contains('active')) l.classList.remove('active');
    });

    /* Clock */
    const clk = $('#kampalaClock');
    function tickClock() {
      if (!clk) return;
      clk.textContent = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Kampala', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }).format(new Date());
    }
    tickClock(); setInterval(tickClock, 1000);

    /* Footer departments + year */
    const footDepts = $('#footDepts');
    if (footDepts) {
      footDepts.innerHTML = D.DEPARTMENTS.slice(0, 6)
        .map(d => '<li><a href="services.html">' + d.name + '</a></li>').join('');
    }
    const yr = $('#year');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ============ Reveal on scroll ============ */
  function initReveal() {
    const revIO = new IntersectionObserver(es => {
      es.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); revIO.unobserve(en.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    $$('.reveal').forEach(el => {
      if (el.dataset.d) el.style.transitionDelay = el.dataset.d + 's';
      revIO.observe(el);
    });
  }

  /* ============ Counters (stats) ============ */
  function initCounters() {
    function animateCount(el) {
      const to = +el.dataset.to;
      const suf = el.dataset.suffix || '';
      const dur = 1500, st = performance.now();
      const step = n => {
        const p = Math.min((n - st) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * e).toLocaleString('en-GB') + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    const cntIO = new IntersectionObserver(es => {
      es.forEach(en => { if (en.isIntersecting) { animateCount(en.target); cntIO.unobserve(en.target); } });
    }, { threshold: .6 });
    $$('.count').forEach(c => cntIO.observe(c));
  }

  /* ============ Departments renderer (used on services page) ============ */
  function initDepartments() {
    const deptList = $('#deptList');
    const deptPanel = $('#deptPanel');
    const apDept = $('#apDept');
    if (!deptList || !deptPanel) return;

    function deptHTML(d) {
      var img = d.img
        ? '<div class="dp-img"><img src="' + d.img + '" alt="' + d.name + ' at Bulamu Medical Clinic"></div>'
        : '';
      return img +
        '<div class="dp-head"><span class="dp-icon"><i class="fa-solid ' + d.icon + '"></i></span>' +
        '<div><span class="dp-tag">' + d.tag + '</span><h3>' + d.name + '</h3></div></div>' +
        '<p class="dp-desc">' + d.desc + '</p>' +
        '<ul class="dp-services">' + d.services.map(s => '<li><i class="fa-solid fa-check"></i>' + s + '</li>').join('') + '</ul>' +
        '<div class="dp-meta">' +
          '<div><i class="fa-regular fa-clock"></i><div><small>Hours</small><strong>' + d.hours + '</strong></div></div>' +
          '<div><i class="fa-solid fa-user-doctor"></i><div><small>Lead specialist</small><strong>' + d.lead + '</strong></div></div>' +
          '<div><i class="fa-solid fa-location-dot"></i><div><small>Where</small><strong>' + d.loc + '</strong></div></div>' +
        '</div>' +
        '<a class="btn btn-primary dp-book" href="appointment.html" data-dept-link="' + d.id + '">Book in this department <i class="fa-solid fa-arrow-right"></i></a>';
    }
    deptList.innerHTML = D.DEPARTMENTS.map((d, i) =>
      '<button class="dept-item' + (i === 0 ? ' active' : '') + '" data-id="' + d.id + '" role="tab" aria-selected="' + (i === 0) + '">' +
      '<span class="di-num">' + String(i + 1).padStart(2, '0') + '</span>' +
      '<span class="di-name">' + d.name + '</span><span class="di-tag">' + d.tag + '</span>' +
      '</button>').join('');
    deptPanel.innerHTML = deptHTML(D.DEPARTMENTS[0]);
    if (apDept) {
      apDept.innerHTML = '<option value="">Choose a department…</option>' +
        D.DEPARTMENTS.map(d => '<option value="' + d.id + '">' + d.name + '</option>').join('');
    }

    deptList.addEventListener('click', e => {
      const b = e.target.closest('.dept-item');
      if (!b || b.classList.contains('active')) return;
      const d = D.DEPARTMENTS.find(x => x.id === b.dataset.id);
      deptList.querySelectorAll('.dept-item').forEach(x => {
        x.classList.toggle('active', x === b);
        x.setAttribute('aria-selected', x === b);
      });
      deptPanel.classList.add('swap');
      setTimeout(() => { deptPanel.innerHTML = deptHTML(d); deptPanel.classList.remove('swap'); }, 170);
    });

    /* Preselect department from links */
    document.addEventListener('click', e => {
      const l = e.target.closest('[data-dept-link]');
      if (l && apDept) {
        apDept.value = l.dataset.deptLink;
        toast('Department preselected in the booking form.', 'file-medical');
      }
    });
  }

  /* ============ Doctors renderer ============ */
  function initDoctors() {
    const docTrack = $('#docTrack');
    const docFilters = $('#docFilters');
    if (!docTrack) return;

    function renderDoctors(cat) {
      cat = cat || 'all';
      const list = D.DOCTORS.filter(d => cat === 'all' || d.cat === cat);
      docTrack.innerHTML = list.map(d =>
        '<a class="doc-card" href="appointment.html" data-dept="' + d.dept + '" data-name="' + d.name + '">' +
          '<div class="doc-img"><img src="https://picsum.photos/seed/' + d.seed + '/480/620.jpg" alt="Portrait of ' + d.name + '" loading="lazy" draggable="false">' +
            '<span class="doc-days"><i class="fa-regular fa-clock"></i>' + d.days + '</span></div>' +
          '<h3>' + d.name + '</h3><p>' + d.role + '</p>' +
          '<span class="doc-go">Book with ' + d.name.split(' ').slice(0, 2).join(' ') + ' <i class="fa-solid fa-arrow-right"></i></span>' +
        '</a>').join('');
      docTrack.scrollTo({ left: 0 });
    }
    renderDoctors();

    if (docFilters) {
      docFilters.addEventListener('click', e => {
        const c = e.target.closest('.chip');
        if (!c) return;
        $$('#docFilters .chip').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        renderDoctors(c.dataset.filter);
      });
    }

    const scrollStep = 290;
    const prev = $('#docPrev'), next = $('#docNext');
    if (prev) prev.addEventListener('click', () => docTrack.scrollBy({ left: -scrollStep * 2, behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => docTrack.scrollBy({ left: scrollStep * 2, behavior: 'smooth' }));

    let dragging = false, dragX = 0, dragL = 0, dragMoved = false;
    docTrack.addEventListener('pointerdown', e => {
      dragging = true; dragMoved = false; dragX = e.clientX; dragL = docTrack.scrollLeft;
      docTrack.classList.add('dragging');
    });
    window.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - dragX;
      if (Math.abs(dx) > 7) dragMoved = true;
      docTrack.scrollLeft = dragL - dx;
    });
    window.addEventListener('pointerup', () => { dragging = false; docTrack.classList.remove('dragging'); });

    docTrack.addEventListener('click', e => {
      if (dragMoved) { e.preventDefault(); return; }
      const card = e.target.closest('.doc-card');
      if (!card) return;
      const apDept = $('#apDept');
      if (apDept) apDept.value = card.dataset.dept;
      toast(card.dataset.name + ' preselected — the booking form is ready for you.', 'user-doctor');
    });
  }

  /* ============ News renderer ============ */
  function initNews() {
    const newsWrap = $('#newsWrap');
    if (!newsWrap) return;

    newsWrap.innerHTML =
      '<div class="news-featured">' +
        '<div class="nf-img"><img src="' + (D.ARTICLES[0].img || 'https://picsum.photos/seed/' + D.ARTICLES[0].seed + '/900/620.jpg') + '" alt="' + D.ARTICLES[0].title + '"><span class="n-tag">' + D.ARTICLES[0].tag + '</span></div>' +
        '<div class="nf-body">' +
          '<p class="n-date">' + D.ARTICLES[0].date + '</p><h3>' + D.ARTICLES[0].title + '</h3>' +
          '<p class="n-lead">' + D.ARTICLES[0].lead + '</p>' +
          '<button class="btn btn-ghost" data-article="0">Read the story <i class="fa-solid fa-arrow-right"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="news-list">' + D.ARTICLES.slice(1).map((a, i) =>
        '<button class="news-row" data-article="' + (i + 1) + '">' +
          '<span class="nr-date">' + a.date + '</span>' +
          '<span class="nr-main"><span class="nr-tag">' + a.tag + '</span><h4>' + a.title + '</h4></span>' +
          '<i class="fa-solid fa-arrow-right-long"></i>' +
        '</button>').join('') + '</div>';

    newsWrap.addEventListener('click', e => {
      const b = e.target.closest('[data-article]');
      if (!b) return;
      const a = D.ARTICLES[+b.dataset.article];
      const body = $('#articleBody');
      if (body) {
        body.innerHTML =
          '<span class="n-tag" style="position:static;display:inline-block">' + a.tag + '</span>' +
          '<p class="n-date" style="margin-top:14px">' + a.date + '</p>' +
          '<p class="am-byline">By ' + (a.byline || 'the Bulamu News Desk') + '</p>' +
          '<h3 class="am-title">' + a.title + '</h3>' +
          '<div class="am-body"><img src="' + (a.img || 'https://picsum.photos/seed/' + a.seed + '/1000/500.jpg') + '" alt="' + a.title + '">' +
          a.body.map(p => '<p>' + p + '</p>').join('') + '</div>';
      }
      const modal = $('#articleModal');
      if (modal) showModal(modal);
    });
  }

  /* ============ Gallery + lightbox ============ */
  function initGallery() {
    const galGrid = $('#galGrid');
    const galFilters = $('#galFilters');
    const galSearch = $('#galSearch');
    const galCount = $('#galCount');
    const lightbox = $('#lightbox');
    const lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbCount = $('#lbCount');
    if (!galGrid || !lightbox) return;

    const items = Array.isArray(D.GALLERY) ? D.GALLERY : [];

    function slugToTitle(s) {
      return s.replace(/[-_]+/g, ' ').replace(/\.[^.]+$/, '').replace(/\b\w/g, c => c.toUpperCase());
    }

    // Normalize items (ensure src, cap, category)
    items.forEach(it => {
      if (!it.src && it.seed && it.w && it.h) it.src = 'https://picsum.photos/seed/' + it.seed + '/800/' + Math.round(800 * (it.h / (it.w || 1))); 
      if (!it.srcLarge && it.src) it.srcLarge = it.src;
      if (!it.cap) it.cap = it.filename ? slugToTitle(it.filename) : (it.src ? slugToTitle(it.src.split('/').pop()) : 'Photo');
      if (!it.category) {
        const parts = (it.src || '').split('/').filter(Boolean);
        it.category = parts.length > 1 ? parts[1] : 'general';
      }
    });

    const categories = Array.from(new Set(items.map(i => i.category || 'general'))).sort();

    // Render filters
    if (galFilters) {
      galFilters.innerHTML = '<button class="chip active" data-filter="all">All</button>' +
        categories.map(c => '<button class="chip" data-filter="' + c + '">' + c.replace(/[-_]/g, ' ') + '</button>').join('');
      galFilters.addEventListener('click', e => {
        const b = e.target.closest('.chip'); if (!b) return;
        $$('#galFilters .chip').forEach(x => x.classList.toggle('active', x === b));
        renderGrid();
      });
    }

    function renderGrid() {
      const active = galFilters ? galFilters.querySelector('.chip.active').dataset.filter : 'all';
      const q = galSearch ? galSearch.value.trim().toLowerCase() : '';
      const visible = items.map((it, i) => ({ it, i }))
        .filter(o => (active === 'all' || o.it.category === active))
        .filter(o => (!q) || (o.it.cap && o.it.cap.toLowerCase().includes(q)) || (o.it.filename && o.it.filename.toLowerCase().includes(q)));

      galGrid.innerHTML = visible.map((v, idx) => {
        const g = v.it;
        return '<figure class="gal-item" data-idx="' + v.i + '" tabindex="0" role="button" aria-label="View: ' + (g.cap || '') + '">' +
          '<img src="' + g.src + '" alt="' + (g.cap || '') + '" loading="lazy" draggable="false">' +
          '<figcaption><strong>' + (g.cap || '') + '</strong><small>' + (g.category || '') + '</small></figcaption>' +
        '</figure>';
      }).join('');

      if (galCount) galCount.textContent = visible.length + ' photos';
    }

    let lbIndex = 0;
    function updateLB() {
      const g = items[lbIndex];
      lbImg.src = g.srcLarge || g.src;
      lbImg.alt = g.cap || '';
      lbCap.textContent = g.cap || '';
      lbCount.textContent = (lbIndex + 1) + ' / ' + items.length;
    }
    function openLBByOriginalIndex(origIndex) { lbIndex = origIndex; updateLB(); lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); }
    function closeLB() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); }

    galGrid.addEventListener('click', e => { const f = e.target.closest('.gal-item'); if (f) openLBByOriginalIndex(+f.dataset.idx); });
    galGrid.addEventListener('keydown', e => { const f = e.target.closest('.gal-item'); if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLBByOriginalIndex(+f.dataset.idx); } });

    const lbClose = $('#lbClose'), lbPrev = $('#lbPrev'), lbNext = $('#lbNext');
    if (lbClose) lbClose.addEventListener('click', closeLB);
    if (lbPrev) lbPrev.addEventListener('click', () => { lbIndex = (lbIndex - 1 + items.length) % items.length; updateLB(); });
    if (lbNext) lbNext.addEventListener('click', () => { lbIndex = (lbIndex + 1) % items.length; updateLB(); });
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });

    if (galSearch) {
      galSearch.addEventListener('input', () => renderGrid());
      galSearch.addEventListener('search', () => renderGrid());
    }

    renderGrid();
  }

  /* ============ Modals (article + privacy) ============ */
  function showModal(m) { if (!m) return; m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); }
  function closeModal(m) { if (!m) return; m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); }
  function initModals() {
    document.addEventListener('click', e => {
      const opener = e.target.closest('[data-modal]');
      if (opener) showModal(document.getElementById(opener.dataset.modal));
      if (e.target.closest('[data-close]')) closeModal(e.target.closest('.modal'));
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const open = document.querySelector('.modal.open');
        if (open) closeModal(open);
        const lb = document.getElementById('lightbox');
        if (lb && lb.classList.contains('open')) { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); }
        if (document.body.classList.contains('nav-open')) {
          document.body.classList.remove('nav-open');
          const nt = document.getElementById('navToggle');
          if (nt) nt.setAttribute('aria-expanded', 'false');
        }
      }
      const lb = document.getElementById('lightbox');
      if (lb && lb.classList.contains('open')) {
        if (e.key === 'ArrowRight') { const n = document.getElementById('lbNext'); if (n) n.click(); }
        if (e.key === 'ArrowLeft') { const p = document.getElementById('lbPrev'); if (p) p.click(); }
      }
    });
  }

  /* ============ Facility lightbox ============ */
  function initFacilityLightbox() {
    const mosaic = document.querySelector('.fac-mosaic');
    const lb = document.getElementById('facLightbox');
    const img = document.getElementById('facLbImg');
    const title = document.getElementById('facLbTitle');
    const cap = document.getElementById('facLbCap');
    const count = document.getElementById('facLbCount');
    const closeBtn = document.getElementById('facLbClose');
    const prevBtn = document.getElementById('facLbPrev');
    const nextBtn = document.getElementById('facLbNext');
    if (!mosaic || !lb || !img) return;

    const tiles = Array.from(mosaic.querySelectorAll('.fac-tile'));
    let idx = 0;

    function render(i) {
      idx = (i + tiles.length) % tiles.length;
      const t = tiles[idx];
      const im = t.querySelector('img');
      const fh = t.querySelector('figcaption h4');
      const fp = t.querySelector('figcaption p');
      img.src = im.src;
      img.alt = im.alt || '';
      title.textContent = fh ? fh.textContent : '';
      cap.textContent = fp ? fp.textContent : '';
      count.textContent = (idx + 1) + ' / ' + tiles.length;
    }
    function open(i) { render(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open'); }
    function close() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); }

    mosaic.addEventListener('click', e => {
      const t = e.target.closest('.fac-tile');
      if (!t) return;
      open(tiles.indexOf(t));
    });
    mosaic.querySelectorAll('.fac-tile').forEach((t, i) => {
      t.setAttribute('tabindex', '0');
      t.setAttribute('role', 'button');
      t.setAttribute('aria-label', 'View larger: ' + (t.querySelector('figcaption h4') ? t.querySelector('figcaption h4').textContent : 'image'));
      t.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => render(idx - 1));
    nextBtn.addEventListener('click', () => render(idx + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') render(idx + 1);
      if (e.key === 'ArrowLeft') render(idx - 1);
    });
  }

  /* ============ FAQ accordion ============ */
  function initFAQ() {
    $$('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-q');
      if (!q) return;
      q.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        $$('.faq-item.open').forEach(o => {
          o.classList.remove('open');
          const oq = o.querySelector('.faq-q'); if (oq) oq.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) { item.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
      });
    });
  }

  /* ============ OPD live status (home hero) ============ */
  function initOPD() {
    const opdText = $('#opdText');
    const opdDot = $('#opdDot');
    if (!opdText) return;

    function opdStatus() {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Kampala', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
      }).formatToParts(new Date());
      const get = t => parts.find(p => p.type === t).value;
      const wd = get('weekday'), h = (+get('hour')) % 24, m = +get('minute'), t = h * 60 + m;
      const sched = wd === 'Sun' ? { o: 600, c: 960, label: '10:00 AM' } : { o: 480, c: 1200, label: '8:00 AM' };
      const fmt = min => { let H = Math.floor(min / 60); const ap = H >= 12 ? 'PM' : 'AM'; H = H % 12 || 12; return H + ' ' + ap; };
      if (t >= sched.o && t < sched.c) return { open: true, text: 'OPD open now · closes ' + fmt(sched.c) };
      if (t < sched.o) return { open: false, text: 'OPD closed · opens today ' + sched.label };
      const next = (wd === 'Sat' || wd === 'Sun') ? 'Monday 8:00 AM' : 'tomorrow ' + sched.label;
      return { open: false, text: 'OPD closed · opens ' + next };
    }
    function updateOPD() {
      const s = opdStatus();
      opdText.textContent = s.text;
      if (opdDot) opdDot.classList.toggle('closed', !s.open);
    }
    updateOPD(); setInterval(updateOPD, 60000);
  }

  /* ============ Appointment form ============ */
  function initAppointmentForm() {
    const apForm = $('#apForm');
    const apDept = $('#apDept');
    const apDate = $('#apDate');
    if (!apForm) return;

    /* Populate departments even if there's no dept-explorer on the page */
    if (apDept && !apDept.options.length) {
      apDept.innerHTML = '<option value="">Choose a department…</option>' +
        D.DEPARTMENTS.map(d => '<option value="' + d.id + '">' + d.name + '</option>').join('');
    }
    if (apDate) apDate.min = new Date().toISOString().slice(0, 10);

    function setErr(el, msg) { const f = el.closest('.field'); f.classList.add('invalid'); const er = f.querySelector('.err'); if (er) er.textContent = msg; }

    apForm.addEventListener('submit', e => {
      e.preventDefault();
      apForm.querySelectorAll('.field').forEach(f => {
        f.classList.remove('invalid');
        const er = f.querySelector('.err'); if (er) er.textContent = '';
      });
      const name = $('#apName'), phone = $('#apPhone'), email = $('#apEmail');
      if (name.value.trim().length < 3) setErr(name, "Please enter the patient's full name.");
      if (phone.value.replace(/\D/g, '').length < 9) setErr(phone, 'Enter a valid phone number, e.g. 0772 123 456.');
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) setErr(email, "That email address doesn't look right.");
      if (!apDept.value) setErr(apDept, 'Choose a department.');
      if (!apDate.value) setErr(apDate, 'Pick a preferred date.');
      else {
        const d = new Date(apDate.value + 'T00:00:00');
        if (d < new Date(new Date().toDateString())) setErr(apDate, 'Please choose today or a future date.');
      }
      if (apForm.querySelector('.field.invalid')) {
        toast('Please correct the highlighted fields.', 'circle-exclamation'); return;
      }
      const ref = 'BLM-' + Date.now().toString(36).toUpperCase().slice(-6);
      const [y, m, d] = apDate.value.split('-').map(Number);
      const nice = new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const fsName = $('#fsName'), fsRef = $('#fsRef'), fsSummary = $('#fsSummary');
      if (fsName) fsName.textContent = name.value.trim().split(' ')[0];
      if (fsRef) fsRef.textContent = ref;
      if (fsSummary) {
        fsSummary.innerHTML = [
          ['Department', apDept.options[apDept.selectedIndex].text],
          ['Preferred date', nice],
          ['Preferred time', $('#apTime').value],
          ['We will call', phone.value.trim()]
        ].map(r => '<li><span>' + r[0] + '</span><strong>' + r[1] + '</strong></li>').join('');
      }
      try {
        const arr = JSON.parse(localStorage.getItem('bulamu_appointments') || '[]');
        arr.push({ ref, name: name.value.trim(), phone: phone.value.trim(), dept: apDept.value, date: apDate.value, ts: Date.now() });
        localStorage.setItem('bulamu_appointments', JSON.stringify(arr));
      } catch (err) { /* ignore */ }
      apForm.hidden = true; const fs = $('#formSuccess'); if (fs) fs.hidden = false;
      toast('Appointment request sent — reference ' + ref + '.');
    });
    const fsReset = $('#fsReset');
    if (fsReset) fsReset.addEventListener('click', () => {
      apForm.reset(); apForm.hidden = false; const fs = $('#formSuccess'); if (fs) fs.hidden = true;
      apForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ============ Newsletter ============ */
  function initNewsletter() {
    const f = $('#newsForm');
    if (!f) return;
    f.addEventListener('submit', e => {
      e.preventDefault();
      const em = $('#newsEmail');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) { toast('Please enter a valid email address.', 'circle-exclamation'); return; }
      toast('Karibu! You are subscribed to hospital updates.', 'envelope-circle-check');
      e.target.reset();
    });
  }

  /* ============ Boot ============ */
  document.addEventListener('DOMContentLoaded', function () {
    initHeader();
    initReveal();
    initCounters();
    initDepartments();
    initDoctors();
    initNews();
    initGallery();
    initFacilityLightbox();
    initModals();
    initFAQ();
    initOPD();
    initAppointmentForm();
    initNewsletter();
  });

  /* Expose helpers */
  window.Bulamu = { toast: toast };
})();