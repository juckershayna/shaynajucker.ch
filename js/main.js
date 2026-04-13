/* ============================================
   SHAYNA JUCKER PORTFOLIO - MAIN.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // === Mobile Menu Toggle ===
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.main-nav ul');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('open');
    });
  }

  // === Header scroll effect ===
  const header = document.querySelector('.site-header');
  if (header && !header.classList.contains('scrolled')) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // === Fade-in on scroll (IntersectionObserver) ===
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // === Back to Top Button ===
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Gallery Slider ===
  const slider = document.getElementById('gallerySlider');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');

  if (slider && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slides = slider.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      slider.scrollTo({
        left: slides[currentSlide].offsetLeft,
        behavior: 'smooth'
      });
    }

    prevBtn.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
    });

    // Auto-advance every 5 seconds
    let autoSlide = setInterval(function () {
      goToSlide(currentSlide + 1);
    }, 5000);

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', function () {
      clearInterval(autoSlide);
    });

    slider.addEventListener('mouseleave', function () {
      autoSlide = setInterval(function () {
        goToSlide(currentSlide + 1);
      }, 5000);
    });
  }

});
