const carousel = document.getElementById('carousel');
  const dots = document.querySelectorAll('.dot');
  const imageWidth = 320;
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('scroll', () => {
    const index = Math.round(carousel.scrollLeft / imageWidth);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  });

  // Optional: add swipe dragging behavior
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });
  carousel.addEventListener('mouseup', () => {
    isDown = false;
  });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (startX - x);
    carousel.scrollLeft = scrollLeft + walk;
  });

  // For touch devices
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    const currentScroll = carousel.scrollLeft;
    if (touchEndX < touchStartX) {
      // Swipe left (next)
      carousel.scrollTo({left: currentScroll + imageWidth, behavior: 'smooth'});
    }
    if (touchEndX > touchStartX) {
      // Swipe right (prev)
      carousel.scrollTo({left: currentScroll - imageWidth, behavior: 'smooth'});
    }
  }
