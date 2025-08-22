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

// --- Latest updates on the home page (if the section exists) ---
fetch('/assets/updates.json')
  .then(r => r.ok ? r.json() : [])
  .then(arr => {
    const ul = document.querySelector('#updates .updates-list');
    if (!ul || !Array.isArray(arr)) return;
    if (!arr.length) {
      ul.innerHTML = '<li>No updates yet.</li>';
      return;
    }
    ul.innerHTML = '';
    arr.slice(0, 5).forEach(it => {
      const li = document.createElement('li');
      const d = new Date(it.ts);
      li.textContent = d.toLocaleString() + ' — ' + (it.msg || 'Automated heartbeat');
      ul.appendChild(li);
    });
  })
  .catch(() => {});

// --- Build timestamp (if /assets/build.txt exists) ---
fetch('/assets/build.txt')
  .then(r => r.ok ? r.text() : '')
  .then(t => {
    const el = document.querySelector('.stamp');
    if (el && t) el.textContent = 'Last update: ' + t.trim();
  })
  .catch(() => {});
