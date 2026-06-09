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

  // === Header scroll effect + nav hide/show ===
  const header = document.querySelector('.site-header');
  const mainNav = document.querySelector('.main-nav');
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener('scroll', function () {
      const currentY = window.scrollY;

      // scrolled class for background
      if (currentY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // hide nav when scrolled away from top, show on any scroll movement
      if (mainNav) {
        if (currentY <= 50) {
          mainNav.classList.remove('nav-hidden');
        } else if (currentY !== lastScrollY) {
          mainNav.classList.remove('nav-hidden');
          clearTimeout(mainNav._hideTimer);
          mainNav._hideTimer = setTimeout(function () {
            if (window.scrollY > 50) mainNav.classList.add('nav-hidden');
          }, 1500);
        }
      }

      lastScrollY = currentY;
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
    if (thumb.closest('.video-showcase__thumbs')) return;
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

  // === Video Showcase: swap thumbnail → featured + autoplay ===
  function ytPlay(el, id) {
    const params = 'autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=1&playsinline=1&color=white';
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?' + params;
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('frameborder', '0');
    el.innerHTML = '';
    el.appendChild(iframe);
    el.classList.add('playing');
  }

  document.querySelectorAll('.video-showcase').forEach(function(showcase) {
    const featured = showcase.querySelector('.video-showcase__featured .video-thumbnail');

    showcase.querySelectorAll('.video-showcase__thumbs .video-thumbnail').forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        const thumbId = thumb.getAttribute('data-yt');
        const featuredId = featured.getAttribute('data-yt');

        featured.setAttribute('data-yt', thumbId);
        thumb.setAttribute('data-yt', featuredId);

        const thumbImg = thumb.querySelector('img');
        if (thumbImg) thumbImg.src = 'https://i.ytimg.com/vi/' + featuredId + '/hqdefault.jpg';

        showcase.querySelectorAll('.video-showcase__thumbs .video-thumbnail').forEach(function(t) {
          t.classList.remove('active');
        });
        thumb.classList.add('active');

        ytPlay(featured, thumbId);
      });
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

  // === Logo scroll-fly effect ===
  (function () {
    const logoEl = document.querySelector('.logo');
    if (!logoEl) return;

    // Resolve cursor image path from the existing logo img src (already absolute)
    const logoImgEl = logoEl.querySelector('img');
    const cursorSrc = logoImgEl
      ? logoImgEl.src.replace(/[^/]+$/, 'cursor-sj.png')
      : '';

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    let isScrolling = false;
    let scrollTimer = null;

    function spawnGhost(fromX, fromY, toX, toY, startSize, endSize, startOpacity, endOpacity) {
      const ghost = new Image();
      ghost.src = cursorSrc;
      ghost.setAttribute('aria-hidden', 'true');
      ghost.style.cssText =
        'position:fixed;pointer-events:none;z-index:99999;' +
        'transform:translate(-50%,-50%);' +
        'width:' + startSize + 'px;height:auto;' +
        'opacity:' + startOpacity + ';' +
        'left:' + fromX + 'px;top:' + fromY + 'px;' +
        'transition:' +
          'left 0.5s cubic-bezier(0.4,0,0.2,1),' +
          'top 0.5s cubic-bezier(0.4,0,0.2,1),' +
          'width 0.5s ease,' +
          'opacity 0.45s ease';
      document.body.appendChild(ghost);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          ghost.style.left = toX + 'px';
          ghost.style.top = toY + 'px';
          ghost.style.width = endSize + 'px';
          ghost.style.opacity = endOpacity;
        });
      });
      setTimeout(function () { ghost.remove(); }, 600);
    }

    function getLogoCenter() {
      const r = logoEl.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    function hideLogo() {
      const c = getLogoCenter();
      logoEl.classList.add('logo--hidden');
      spawnGhost(mouseX, mouseY, c.x, c.y, 36, 80, 1, 0);
    }

    function showLogo() {
      const c = getLogoCenter();
      spawnGhost(c.x, c.y, mouseX, mouseY, 80, 36, 1, 0);
      setTimeout(function () {
        logoEl.classList.remove('logo--hidden');
      }, 350);
    }

    window.addEventListener('scroll', function () {
      if (!isScrolling) {
        isScrolling = true;
        hideLogo();
      }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        isScrolling = false;
        showLogo();
      }, 200);
    }, { passive: true });
  }());

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
