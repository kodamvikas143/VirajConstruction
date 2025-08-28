document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project').forEach((project) => {
    const container = project.querySelector('.image-container1');
    const wrapper = container.querySelector('.image-scroll-container');
    const imagesCount = wrapper.children.length;
    let currentIndex = 0;
    let startX = 0;
    const dotsContainer = project.querySelector('.dots');
    let dots = [];

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i < imagesCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => {
          currentIndex = i;
          update();
        });
      }
    }

    function update() {
      wrapper.style.transform = `translateX(${-currentIndex * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
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