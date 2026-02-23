/* Selkirk Hardwood — UI Controller */
(function() {
  // Mobile Menu Toggle
  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var navLinks = document.querySelector('.nav-links');
    var header = document.querySelector('.header');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded',
        toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });

    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
      });
    });

    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
      }
    });

    // Dropdown toggles on mobile
    document.querySelectorAll('.nav-dropdown > a').forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        if (window.innerWidth < 769) {
          e.preventDefault();
          this.parentElement.classList.toggle('open');
        }
      });
    });
  }

  // FAQ Accordion
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function(q) {
      q.addEventListener('click', function() {
        var item = this.parentElement;
        var wasOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('active'); });
        if (!wasOpen) item.classList.add('active');
      });
    });
  }

  // Floating CTA visibility
  function initFloatingCTA() {
    var cta = document.querySelector('.floating-cta');
    if (!cta) return;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        cta.classList.add('visible');
      } else {
        cta.classList.remove('visible');
      }
    });
  }

  // Scroll header background
  function initScrollBanner() {
    var header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Active nav link
  function initActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function(link) {
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      }
    });
  }

  // Before-after slider
  function initBeforeAfter() {
    document.querySelectorAll('.ba-slider').forEach(function(slider) {
      var handle = slider.querySelector('.ba-handle');
      var beforeImg = slider.querySelector('.ba-before img');
      if (!handle || !beforeImg) return;
      
      var isDragging = false;
      function moveSlider(x) {
        var rect = slider.getBoundingClientRect();
        var pos = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        beforeImg.style.clipPath = 'inset(0 0 0 ' + pos + '%)';
        handle.style.left = pos + '%';
      }
      
      handle.addEventListener('mousedown', function() { isDragging = true; });
      handle.addEventListener('touchstart', function() { isDragging = true; });
      document.addEventListener('mouseup', function() { isDragging = false; });
      document.addEventListener('touchend', function() { isDragging = false; });
      document.addEventListener('mousemove', function(e) { if (isDragging) moveSlider(e.clientX); });
      document.addEventListener('touchmove', function(e) { if (isDragging) moveSlider(e.touches[0].clientX); });
    });
  }

  // Force all content visible (safety net)
  function forceVisible() {
    document.querySelectorAll('.reveal, [data-aos], .fade-up, .slide-in-left, .slide-in-right').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
  }

  // Counter Animation
  function initCounters() {
    var counters = document.querySelectorAll('.stat-number [data-counter], .stat-number[data-counter]');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-counter'));
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals')) || 0;
      var duration = 2000;
      var start = performance.now();

      function update(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        var ease = 1 - Math.pow(1 - progress, 3);
        var current = ease * target;
        el.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function(el) { observer.observe(el); });
  }

  function init() {
    initMobileMenu();
    initFAQ();
    initFloatingCTA();
    initScrollBanner();
    initActiveNav();
    initBeforeAfter();
    forceVisible();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
