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

  // === YouTube Click-to-Play (privacy-enhanced, no branding) ===
  document.querySelectorAll('.video-thumbnail[data-yt]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      const id = thumb.getAttribute('data-yt');
      if (!id) return;
      const params = 'autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=1&playsinline=1&color=white';
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?' + params;
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('frameborder', '0');
      thumb.innerHTML = '';
      thumb.appendChild(iframe);
      thumb.classList.add('playing');
    });
  });

  // === Portfolio Group Toggle ===
  document.querySelectorAll('.portfolio-group-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.portfolio-item--group');
      const sub = item.querySelector('.portfolio-sub');
      const isOpen = !sub.hidden;
      sub.hidden = isOpen;
      btn.setAttribute('aria-expanded', String(!isOpen));
      item.classList.toggle('open', !isOpen);
    });
  });

  // === Gallery Marquee (supports multiple) ===
  document.querySelectorAll('.gallery-slider').forEach(initGalleryMarquee);

  function initGalleryMarquee(slider) {
    const viewport = slider.parentElement;
    const originals = Array.from(slider.children);
    originals.forEach(node => slider.appendChild(node.cloneNode(true)));

    let paused = false;
    let lastTs = performance.now();
    const speed = 40;

    const halfWidth = () => slider.scrollWidth / 2;

    const seed = () => {
      viewport.scrollLeft = halfWidth() / 2;
    };

    if (document.readyState === 'complete') {
      seed();
    } else {
      window.addEventListener('load', seed);
    }

    slider.addEventListener('mouseenter', () => { paused = true; });
    slider.addEventListener('mouseleave', () => { paused = false; lastTs = performance.now(); });

    slider.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        viewport.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });

    viewport.addEventListener('scroll', () => {
      const half = halfWidth();
      if (viewport.scrollLeft > half) {
        viewport.scrollLeft -= half;
      } else if (viewport.scrollLeft <= 0) {
        viewport.scrollLeft = half;
      }
    });

    function tick(ts) {
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (!paused) {
        viewport.scrollLeft += speed * dt;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

});
