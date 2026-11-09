document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const siteNav = document.getElementById('site-nav');

  if (mobileToggle && siteNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('nav-open');
    });

    // Close menu when a navigation link is clicked
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('nav-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Scroll-driven Entrance Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Navigation Active State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-header nav a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
});