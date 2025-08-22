// --- burger menu ---
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
  });
}

// --- smooth scroll for internal links ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Latest updates on the home page ---
(async () => {
  try {
    const res = await fetch('/assets/updates.json', { cache: 'no-store' });
    const data = res.ok ? await res.json() : [];
    const section = document.getElementById('updates');
    const ul = document.querySelector('#updates .updates-list');
    if (!section || !ul || !Array.isArray(data)) return;

    // Garde uniquement les vraies news (pas de heartbeat)
    const newsOnly = data.filter(it => it && it.kind !== 'heartbeat');

    // S'il n'y a pas de vraie news, on masque toute la section
    if (!newsOnly.length) {
      section.style.display = 'none';
      return;
    }

    const fmt = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    ul.innerHTML = '';
    newsOnly.slice(0, 5).forEach(it => {
      const ts = it && it.ts ? new Date(it.ts) : new Date();
      const msg = (it && it.msg) ? it.msg : '';
      const li = document.createElement('li');
      li.textContent = `${fmt.format(ts)} — ${msg}`;
      ul.appendChild(li);
    });
  } catch (_) {
    // silencieux
  }
})();

// --- Build timestamp (if /assets/build.txt exists) ---
fetch('/assets/build.txt', { cache: 'no-store' })
  .then(r => (r.ok ? r.text() : ''))
  .then(t => {
    const el = document.querySelector('.stamp');
    if (el && t) el.textContent = 'Last update: ' + t.trim();
  })
  .catch(() => {});
