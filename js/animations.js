/* ============================================
   Selkirk Hardwood — Animation Controller
   Premium Awwwards-quality animations
   ============================================ */

(function () {
  'use strict';

  // ── Lenis Smooth Scroll ──
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // Connect with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    window._lenis = lenis;
  }

  // ── GSAP + ScrollTrigger ──
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance timeline
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-label', { y: 30, opacity: 0, duration: 0.8 })
        .from('.hero h1', { y: 40, opacity: 0, duration: 0.9 }, '-=0.5')
        .from('.hero .hero-desc', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-buttons', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-trust', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-image', { x: 60, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.8');
    }

    // Hero parallax
    const heroImg = document.querySelector('.hero-image img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }

    // Section headings — fade up
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // Section labels
    gsap.utils.toArray('.section-label').forEach((el) => {
      gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // Section subtitles
    gsap.utils.toArray('.section-subtitle').forEach((el) => {
      gsap.from(el, {
        y: 25,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // Service cards — staggered reveal
    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%', once: true },
      });
    }

    // Value props stagger
    const valueProps = gsap.utils.toArray('.value-prop');
    if (valueProps.length) {
      gsap.from(valueProps, {
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.value-props', start: 'top 80%', once: true },
      });
    }

    // Gallery items stagger
    const galleryItems = gsap.utils.toArray('.gallery-item, .swiper-slide .gallery-item');
    if (galleryItems.length) {
      gsap.from(galleryItems, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: { trigger: '.gallery-grid, .gallery-swiper', start: 'top 80%', once: true },
      });
    }

    // Trust badges
    const trustBadges = gsap.utils.toArray('.trust-badge');
    if (trustBadges.length) {
      gsap.from(trustBadges, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.trust-badges', start: 'top 85%', once: true },
      });
    }

    // About section
    const aboutImg = document.querySelector('.about-image');
    if (aboutImg) {
      gsap.from(aboutImg, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about-grid', start: 'top 75%', once: true },
      });
    }

    // Testimonial cards stagger
    const testimonialCards = gsap.utils.toArray('.testimonial-card');
    if (testimonialCards.length) {
      gsap.from(testimonialCards, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: { trigger: '.testimonials-section, .testimonials-grid', start: 'top 80%', once: true },
      });
    }

    // Area cards stagger
    const areaCards = gsap.utils.toArray('.area-card');
    if (areaCards.length) {
      gsap.from(areaCards, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: { trigger: '.areas-grid', start: 'top 80%', once: true },
      });
    }

    // FAQ items
    const faqItems = gsap.utils.toArray('.faq-item');
    if (faqItems.length) {
      gsap.from(faqItems, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        scrollTrigger: { trigger: '.faq-list, .faq-page', start: 'top 80%', once: true },
      });
    }

    // CTA sections — scale up
    gsap.utils.toArray('.cta-section').forEach((el) => {
      gsap.from(el.querySelector('h2'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    });

    // Guarantee section
    const guarantee = document.querySelector('.guarantee-section');
    if (guarantee) {
      gsap.from(guarantee, {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: guarantee, start: 'top 80%', once: true },
      });
    }

    // Pricing cards stagger
    const pricingCards = gsap.utils.toArray('.pricing-card');
    if (pricingCards.length) {
      gsap.from(pricingCards, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%', once: true },
      });
    }

    // Content sections on inner pages
    gsap.utils.toArray('.content-section h2, .content-section h3').forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // Service detail images
    gsap.utils.toArray('.service-detail-img').forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    // Footer parallax
    const footer = document.querySelector('.footer');
    if (footer) {
      gsap.from(footer, {
        backgroundPositionY: '20%',
        scrollTrigger: { trigger: footer, start: 'top bottom', end: 'bottom bottom', scrub: true },
      });
    }

    // Page hero entrance
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
      gsap.from(pageHero.querySelector('h1'), { y: 30, opacity: 0, duration: 0.8, delay: 0.2 });
      const pageHeroP = pageHero.querySelector('p');
      if (pageHeroP) gsap.from(pageHeroP, { y: 20, opacity: 0, duration: 0.7, delay: 0.4 });
    }
  }

  // ── Typed.js ──
  function initTyped() {
    if (typeof Typed === 'undefined') return;
    const el = document.getElementById('typed-text');
    if (!el) return;
    new Typed('#typed-text', {
      strings: ['hardwood', 'oak', 'maple', 'fir', 'walnut', 'hickory'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }

  // ── Counter Animation ──
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.getAttribute('data-counter'));
            const suffix = el.getAttribute('data-suffix') || '';
            const prefix = el.getAttribute('data-prefix') || '';
            const decimals = el.getAttribute('data-decimals') || 0;
            const duration = 2000;
            const start = performance.now();

            function update(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * target;
              el.textContent = prefix + current.toFixed(decimals) + suffix;
              if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => observer.observe(el));
  }

  // ── Swiper Testimonials ──
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    // Testimonials carousel
    const testimonialsEl = document.querySelector('.testimonials-swiper');
    if (testimonialsEl) {
      new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }

    // Gallery slider
    const galleryEl = document.querySelector('.gallery-swiper');
    if (galleryEl) {
      new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        pagination: { el: '.gallery-pagination', clickable: true },
        navigation: { nextEl: '.gallery-next', prevEl: '.gallery-prev' },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }
  }

  // ── GLightbox ──
  function initGLightbox() {
    if (typeof GLightbox === 'undefined') return;
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      closeButton: true,
    });
  }

  // ── Vanilla Tilt ──
  function initTilt() {
    if (typeof VanillaTilt === 'undefined') return;
    const tiltEls = document.querySelectorAll('[data-tilt]');
    if (!tiltEls.length) return;
    // Only on non-touch devices
    if ('ontouchstart' in window) return;
    VanillaTilt.init(tiltEls, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02,
    });
  }

  // ── Splitting.js ──
  function initSplitting() {
    if (typeof Splitting === 'undefined') return;
    Splitting({ target: '[data-splitting]', by: 'chars' });
    // Animate split chars on scroll
    document.querySelectorAll('[data-splitting]').forEach((el) => {
      const chars = el.querySelectorAll('.char');
      if (!chars.length || typeof gsap === 'undefined') return;
      gsap.from(chars, {
        opacity: 0,
        y: 20,
        rotateX: -40,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
  }

  // ── AOS Fallback ──
  function initAOS() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: 'mobile',
    });
  }

  // ── Before/After Comparison Slider ──
  function initBeforeAfter() {
    document.querySelectorAll('.ba-slider').forEach((container) => {
      const beforeImg = container.querySelector('.ba-before');
      const handle = container.querySelector('.ba-handle');
      if (!beforeImg || !handle) return;

      let isDragging = false;

      function setPosition(x) {
        const rect = container.getBoundingClientRect();
        let pos = ((x - rect.left) / rect.width) * 100;
        pos = Math.max(2, Math.min(98, pos));
        beforeImg.style.clipPath = `inset(0 0 0 ${pos}%)`;
        handle.style.left = pos + '%';
      }

      function onMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        setPosition(x);
      }

      function onEnd() {
        isDragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      }

      handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
      });

      handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
      });

      // Click to jump
      container.addEventListener('click', (e) => {
        setPosition(e.clientX);
      });

      // Initialize at 50%
      setPosition(container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2);
    });
  }

  // ── Magnetic Buttons ──
  function initMagneticButtons() {
    if ('ontouchstart' in window) return;
    document.querySelectorAll('.btn-magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
      });
    });
  }

  // ── Header Scroll ──
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── Mobile Menu ──
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }

  // ── FAQ Accordion ──
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach((btn) => {
      // Remove inline onclick if present
      btn.removeAttribute('onclick');
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active') || item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item.active, .faq-item.open').forEach((el) => {
          el.classList.remove('active', 'open');
          el.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active', 'open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ── Floating CTA ──
  function initFloatingCTA() {
    const fc = document.getElementById('floatingCta');
    if (!fc) return;
    setTimeout(() => fc.classList.add('visible'), 2000);
  }

  // ── Scroll CTA Banner ──
  function initScrollBanner() {
    const banner = document.getElementById('scrollCtaBanner');
    if (!banner) return;
    let shown = false;
    window.addEventListener('scroll', () => {
      if (shown) return;
      const ratio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (ratio > 0.6) {
        banner.classList.add('visible');
        shown = true;
      }
    });
  }

  // ── Navbar active state ──
  function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('nav-active');
    });
  }

  // ── Initialize Everything ──
  function init() {
    initLenis();
    initGSAP();
    initTyped();
    initCounters();
    initSwiper();
    initGLightbox();
    initTilt();
    initSplitting();
    initAOS();
    initBeforeAfter();
    initMagneticButtons();
    initHeader();
    initMobileMenu();
    initFAQ();
    initFloatingCTA();
    initScrollBanner();
    initActiveNav();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
