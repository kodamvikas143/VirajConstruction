 // Hamburger navigation for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('nav ul');
    navToggle.addEventListener('click', function () {
      navList.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
   document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project').forEach((project) => {
    const wrapper = project.querySelector('.image-scroll-container');
    const dotsContainer = project.querySelector('.dots');
    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.dot')) : [];
    const images = Array.from(wrapper.querySelectorAll('img'));

    // On dot click, scroll to image
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        images[i].scrollIntoView({ behavior: 'smooth', inline: 'start' });
      });
    });

    // On scroll, update active dot (sync with visible image)
    wrapper.addEventListener('scroll', () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      let closest = 0;
      let minDiff = Infinity;
      images.forEach((img, i) => {
        const imgRect = img.getBoundingClientRect();
        // Distance from image left edge to container left edge
        const diff = Math.abs(imgRect.left - wrapperRect.left);
        if (diff < minDiff) {
          minDiff = diff;
          closest = i;
        }
      });
      dots.forEach((dot, i) => dot.classList.toggle('active', i === closest));
    });

    // Initialize active dot
    dots.forEach((dot, i) => dot.classList.toggle('active', i === 0));
  });
});
