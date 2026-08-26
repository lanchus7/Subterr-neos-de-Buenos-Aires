
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('heroCarousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('.clean-slide')];
  const dots = [...carousel.querySelectorAll('.clean-dots button')];
  const origin = document.getElementById('origin');
  const dest = document.getElementById('dest');
  const swap = document.getElementById('swap');

  let current = 0;
  let timer = null;
  let plannerLocked = false;

  function show(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    if (plannerLocked) return;
    timer = setInterval(() => show(current + 1), 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      plannerLocked = false;
      show(i);
      start();
    });
  });

  function lockPlanner() {
    plannerLocked = true;
    stop();
    if (current !== 0) show(0);
  }

  function unlockPlanner() {
    setTimeout(() => {
      if (document.activeElement !== origin && document.activeElement !== dest) {
        plannerLocked = false;
        start();
      }
    }, 250);
  }

  [origin, dest].forEach(input => {
    if (!input) return;
    input.addEventListener('focus', lockPlanner);
    input.addEventListener('pointerdown', lockPlanner);
    input.addEventListener('keydown', lockPlanner);
    input.addEventListener('blur', unlockPlanner);
  });

  if (swap) {
    swap.addEventListener('pointerdown', lockPlanner);
  }

  show(0);
  start();
});
