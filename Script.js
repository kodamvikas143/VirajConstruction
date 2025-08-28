document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project').forEach((project) => {
    const container = project.querySelector('.image-container1');
    const wrapper = container.querySelector('.image-scroll-container');
    const dotsContainer = project.querySelector('.dots');
    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.dot')) : [];
    const imagesCount = wrapper.children.length;
    let currentIndex = 0;
    let startX = 0;

    function update() {
      wrapper.style.transform = `translateX(${-currentIndex * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }

    if (dots.length) {
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          currentIndex = parseInt(dot.dataset.index, 10);
          update();
        });
      });
    }

    function handleSwipe(diffX) {
      const swipeThreshold = 50;
      if (diffX > swipeThreshold && currentIndex < imagesCount - 1) {
        currentIndex++;
      } else if (diffX < -swipeThreshold && currentIndex > 0) {
        currentIndex--;
      }
      update();
    }

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      handleSwipe(diffX);
    });

    update();
  });
});