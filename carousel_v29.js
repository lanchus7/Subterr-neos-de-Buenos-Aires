
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('heroCarousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dots button'));
  const origin = document.getElementById('origin');
  const dest = document.getElementById('dest');

  if (!slides.length || !dots.length) return;

  let current = 0;
  let timer = null;
  let plannerPaused = false;

  function show(index) {
    current = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    dots.forEach(function (dot, i) {
      const active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });

    carousel.classList.toggle('artwork-active', current !== 0);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startTimer() {
    stopTimer();
    if (plannerPaused) return;
    timer = setInterval(function () {
      show(current + 1);
    }, 5000);
  }

  // All five dots are always clickable.
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      // Clicking a dot is an explicit navigation action, so it always changes slide.
      plannerPaused = false;
      show(i);
      startTimer();
    });
  });

  function pauseForPlanner() {
    // If the user is interacting with Origen/Destino, keep slide 1 fixed.
    plannerPaused = true;
    stopTimer();
    if (current !== 0) show(0);
  }

  function resumeAfterPlanner() {
    plannerPaused = false;
    startTimer();
  }

  [origin, dest].forEach(function (input) {
    if (!input) return;

    input.addEventListener('focus', pauseForPlanner);
    input.addEventListener('mousedown', pauseForPlanner);
    input.addEventListener('keydown', pauseForPlanner);

    // Delay resume so choosing an autocomplete suggestion does not make
    // the carousel change underneath the user's click.
    input.addEventListener('blur', function () {
      setTimeout(function () {
        const active = document.activeElement;
        if (active !== origin && active !== dest) {
          resumeAfterPlanner();
        }
      }, 300);
    });
  });

  show(0);
  startTimer();
});
