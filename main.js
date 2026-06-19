document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Navigation Scroll Effect
  // ==========================================
  const siteNav = document.getElementById('site-nav');
  const scrollThreshold = 100;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check


  // ==========================================
  // 2. Mobile Drawer Control (Hamburger Menu)
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const toggleMenu = () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = ''; // Enable scroll
    } else {
      mobileDrawer.classList.add('open');
      menuToggle.classList.add('open');
      document.body.style.overflow = 'hidden'; // Disable scroll
    }
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close drawer when clicking a link
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ==========================================
  // 3. Scroll Fade-in Animation (Intersection Observer)
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -10% 0px', // Trigger slightly before element enters fully
    threshold: 0.15 // 15% of the element is visible
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        // Once animated, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });


  // ==========================================
  // 4. Parallax Effect for Images (Desktop Only)
  // ==========================================
  const parallaxImages = document.querySelectorAll('.parallax-img');
  
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxImages.forEach(img => {
        const parent = img.parentElement;
        const rect = parent.getBoundingClientRect();
        
        // Check if the parent container is visible on screen
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Calculate movement delta
          const speed = 0.08;
          const yPos = -(rect.top * speed);
          img.style.transform = `scale(1.08) translateY(${yPos}px)`;
        }
      });
    });
  }

  // ==========================================
  // 5. Auto Slideshow (5s Auto Slide)
  // ==========================================
  const startSlideshow = (containerSelector) => {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
      const slides = container.querySelectorAll('.slide');
      if (slides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
          slides[currentSlide].classList.remove('active');
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].classList.add('active');
        }, 5000);
      }
    });
  };

  startSlideshow('.space-slideshow');
  startSlideshow('.commitment-slideshow');
  startSlideshow('.hero-slideshow');



});
