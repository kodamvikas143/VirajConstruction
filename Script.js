const carousel = document.getElementById('carousel');
  const dots = document.querySelectorAll('.dot');
  const imageWidth = 320;

  let isDown = false,
      startX,
      scrollLeft;

  // Scroll event to update dots
  carousel.addEventListener('scroll', () => {
    const index = Math.round(carousel.scrollLeft / imageWidth);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  });

  // Mouse drag features (optional for desktop)
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add('active');
  });
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
  });
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
  });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (startX - x);
    carousel.scrollLeft = scrollLeft + walk;
  });

  // Touch swipe support with improved handling
  let touchStartX = 0,
      touchEndX = 0,
      isSwiping = false;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    isSwiping = false;
  }, {passive: true});

  carousel.addEventListener('touchmove', (e) => {
    const currentX = e.touches[0].clientX;
    const diffX = Math.abs(currentX - touchStartX);
    if (diffX > 10) { // Detect swipe after ~10px movement
      isSwiping = true;
    }
  }, {passive: true});

  carousel.addEventListener('touchend', (e) => {
    if (!isSwiping) return; // Do nothing if no swipe
    
    touchEndX = e.changedTouches[0].clientX;
    const currentScroll = carousel.scrollLeft;

    if (touchEndX < touchStartX) {
      // Swipe left (next)
      carousel.scrollTo({ left: currentScroll + imageWidth, behavior: 'smooth' });
    } else if (touchEndX > touchStartX) {
      // Swipe right (prev)
      carousel.scrollTo({ left: currentScroll - imageWidth, behavior: 'smooth' });
    }
  }, {passive: true});