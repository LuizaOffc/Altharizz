// Dark/Light mode toggle (sama seperti sebelumnya)
const toggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

toggleBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
});

// Fade-in on scroll menggunakan Intersection Observer
const fadeElements = document.querySelectorAll('.fade-in-section');

const observerOptions = {
  threshold: 0.15, // mulai animasi saat 15% elemen terlihat
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // observe sekali saja
    }
  });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));
