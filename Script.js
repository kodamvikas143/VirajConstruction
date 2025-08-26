const carousel = document.getElementById('carousel');
const dots = document.querySelectorAll('.dot');

function getImageWidth() {
  const img = carousel.querySelector('img');
  if (!img) return 0;
  return img.clientWidth + 10; // image width + gap
}

// Update dots on scroll
carousel.addEventListener('scroll', () => {
  const index = Math.round(carousel.scrollLeft / getImageWidth());
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
});

// Touch swipe support
let startX = 0, isSwiping = false;

carousel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
  isSwiping = false;
}, { passive: true });

carousel.addEventListener('touchmove', e => {
  if (Math.abs(e.touches[0].clientX - startX) > 10) isSwiping = true;
}, { passive: true });

carousel.addEventListener('touchend', e => {
  if (!isSwiping) return;
  const endX = e.changedTouches[0].clientX;
  const scroll = carousel.scrollLeft;
  const imgWidth = getImageWidth();

  if (endX < startX) {
    carousel.scrollTo({ left: scroll + imgWidth, behavior: 'smooth' });
  } else {
    carousel.scrollTo({ left: scroll - imgWidth, behavior: 'smooth' });
  }
});

// Dot click to scroll
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    carousel.scrollTo({ left: index * getImageWidth(), behavior: 'smooth' });
  });
});
