// Initialize all carousels with their dots individually
document.querySelectorAll('.image-scroll-container').forEach((carousel) => {
  const dotsContainer = carousel.nextElementSibling;
  if (!dotsContainer) return;
  const dots = dotsContainer.querySelectorAll('.dot');

  function getImageWidth() {
    const img = carousel.querySelector('img');
    if (!img) return 0;
    return img.clientWidth + 10; // image width + gap (match CSS gap)
  }

  carousel.addEventListener('scroll', () => {
    const index = Math.floor(carousel.scrollLeft / getImageWidth());
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  });

  // Touch swipe support variables
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

  // Dot click navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      carousel.scrollTo({ left: index * getImageWidth(), behavior: 'smooth' });
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    });
  });
});
