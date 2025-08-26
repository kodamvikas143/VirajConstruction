const carousel = document.getElementById('carousel');
const dots = document.querySelectorAll('.dot');

// Dynamically get image width
function getImageWidth() {
  return carousel.querySelector('img').clientWidth + 10; // +gap
}

// Update dots on scroll
carousel.addEventListener('scroll', () => {
  const index = Math.round(carousel.scrollLeft / getImageWidth());
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
});

// Desktop drag functionality
let isDown = false, startX, scrollLeft;
carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', () => isDown = false);
carousel.addEventListener('mouseup', () => isDown = false);
carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = startX - x;
  carousel.scrollLeft = scrollLeft + walk;
});

// Mobile swipe support
let touchStartX = 0, touchEndX = 0, isSwiping = false;

carousel.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  isSwiping = false;
}, {passive: true});

carousel.addEventListener('touchmove', (e) => {
  const currentX = e.touches[0].clientX;
  if (Math.abs(currentX - touchStartX) > 10) isSwiping = true;
}, {passive: true});

carousel.addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  touchEndX = e.changedTouches[0].clientX;
  const currentScroll = carousel.scrollLeft;
  const imgWidth = getImageWidth();

  if (touchEndX < touchStartX) {
    // Swipe left → next
    carousel.scrollTo({ left: currentScroll + imgWidth, behavior: 'smooth' });
  } else {
    // Swipe right → prev
    carousel.scrollTo({ left: currentScroll - imgWidth, behavior: 'smooth' });
  }
}, {passive: true});
