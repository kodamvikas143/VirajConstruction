 // Hamburger navigation for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('nav ul');
    navToggle.addEventListener('click', function () {
      navList.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    document.body.addEventListener('click', function (e) {
      if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
        navList.classList.remove('active');
        navToggle.classList.remove('active');
      }
    }, true);

    // Carousel - horizontal scroll and dots
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.project').forEach((project) => {
        const wrapper = project.querySelector('.image-scroll-container');
        const dotsContainer = project.querySelector('.dots');
        const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.dot')) : [];
        const images = Array.from(wrapper.querySelectorAll('img'));

        if (dots.length > 1) {
          dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
              images[i].scrollIntoView({ behavior: 'smooth', inline: 'start' });
            });
          });

          wrapper.addEventListener('scroll', () => {
            const scrollLeft = wrapper.scrollLeft;
            const width = wrapper.offsetWidth;
            let active = 0;
            images.forEach((img, idx) => {
              if (img.offsetLeft - scrollLeft < width / 2) active = idx;
            });
            dots.forEach((dot, i) => dot.classList.toggle('active', i === active));
          });
        }
      });
    });