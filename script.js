document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id], .connect[id]');
  const navLinks = document.querySelectorAll('.site-header nav a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for sticky header
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      // Remove inline color styling to reset
      link.style.color = ''; 
      if (link.getAttribute('href') === `#${currentId}`) {
        // Apply the accent color to the active section link
        link.style.color = '#70835A';
      }
    });
  });
});