const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const header = document.querySelector('.site-header');

const progress = document.createElement('div');
progress.className = 'site-progress';
progress.setAttribute('aria-hidden', 'true');
body.prepend(progress);

requestAnimationFrame(() => {
  body.classList.add('is-ready');
  body.classList.remove('is-loading');
});

const revealItems = [...document.querySelectorAll('.hidden')];
if (prefersReducedMotion) {
  revealItems.forEach(item => item.classList.add('show'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -55px' });
  revealItems.forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 85}ms`);
    revealObserver.observe(item);
  });
}

let ticking = false;
const updateScrollEffects = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.max(0, Math.min(progressValue, 1))})`;
  header?.classList.toggle('is-compact', window.scrollY > 32);

  const heroImage = document.querySelector('.hero-media img');
  const heroMedia = document.querySelector('.hero-media');
  if (heroImage && heroMedia && !prefersReducedMotion) {
    const rect = heroMedia.getBoundingClientRect();
    const shift = Math.max(-36, Math.min(36, -rect.top * 0.06));
    heroImage.style.transform = `scale(1.045) translate3d(0, ${shift}px, 0)`;
  }
  ticking = false;
};
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}, { passive: true });
updateScrollEffects();

document.querySelector('.menu')?.addEventListener('click', () => {
  body.classList.toggle('mobile-nav-open');
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => body.classList.remove('mobile-nav-open')));

if (!prefersReducedMotion) {
  document.querySelectorAll('.button, .text-link, .round-link').forEach(link => {
    link.addEventListener('pointermove', event => {
      const rect = link.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      link.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    link.addEventListener('pointerleave', () => { link.style.transform = ''; });
  });

  document.querySelectorAll('.capability-card, .project, .projects-feature').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      card.style.setProperty('--tilt-x', `${y * -1.4}deg`);
      card.style.setProperty('--tilt-y', `${x * 1.4}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
}

document.querySelector('.form')?.addEventListener('submit', event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.textContent = 'ENQUIRY RECEIVED  ✓';
  button.classList.add('is-sent');
  button.disabled = true;
});
