(() => {
  'use strict';

  // ← Wpisz numer WhatsApp w formacie międzynarodowym, bez "+" i spacji (np. 48501234567)
  const WA_NUMBER = '48XXXXXXXXX';
  const MESSAGE = 'Dzień dobry! Chciałbym/Chciałabym umówić wizytę w Państwa salonie.';

  const root = document.documentElement;
  root.classList.add('js');

  // WhatsApp: ten sam numer i wiadomość we wszystkich przyciskach; karty usług dodają nazwę usługi
  document.querySelectorAll('a[data-wa]').forEach((a) => {
    const service = a.dataset.service;
    const text = service ? `${MESSAGE} Interesuje mnie usługa: ${service}.` : MESSAGE;
    a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  // Menu mobilne
  const nav = document.getElementById('nav');
  const burger = document.querySelector('.burger');
  const behind = document.querySelectorAll('main, footer, .fab');

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    root.classList.toggle('lock', open);
    behind.forEach((el) => { el.inert = open; });
  };

  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  // Pojawianie się sekcji
  const items = document.querySelectorAll('.rv');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !calm) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }
})();
