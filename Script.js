 document.querySelectorAll('.project').forEach(project => {
    const container = project.querySelector('.image-container1');
    const wrapper = container.querySelector('.image-scroll-container');
    const imagesCount = wrapper.children.length;
    let startX = 0;
    let currentIndex = 0;
    // Initialize dots if dots container exists
    const dotsContainer = project.querySelector('.dots');
    let dots = [];
    if (dotsContainer) {
      for (let i = 0; i < imagesCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
        dots.push(dot);
        // Dot click to jump to image
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateTransform();
          updateDots();
        });
      }
    }
    
    function updateTransform() {
      wrapper.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
    function updateDots() {
      if (dots.length) {
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }
    container.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    container.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const swipeThreshold = 50;
      if (diffX > swipeThreshold && currentIndex < imagesCount - 1) {
        currentIndex++;
      } else if (diffX < -swipeThreshold && currentIndex > 0) {
        currentIndex--;
      }
      updateTransform();
      updateDots();
    });
  });