'use strict';

// ============================================
// PARTICLE SYSTEM - 3D Network Background
// ============================================

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.particleCount = window.innerWidth < 768 ? 40 : 80;
    this.connectionDistance = window.innerWidth < 768 ? 100 : 150;
    this.init();
    this.animate();
    this.setupEvents();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particleCount = window.innerWidth < 768 ? 40 : 80;
      this.connectionDistance = window.innerWidth < 768 ? 100 : 150;
    });
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Pulse effect
      p.pulsePhase += p.pulseSpeed;
      const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;

      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }
      }

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;

      // Draw particle with glow
      const size = p.size * pulse;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(45, 100%, 72%, ${p.opacity * pulse})`;
      this.ctx.fill();

      // Glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(45, 100%, 72%, ${p.opacity * pulse * 0.1})`;
      this.ctx.fill();

      // Draw connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const opacity = (1 - dist / this.connectionDistance) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `hsla(45, 100%, 72%, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }

      // Mouse connections
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const opacity = (1 - dist / this.mouse.radius) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `hsla(45, 100%, 72%, ${opacity})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}


// ============================================
// CUSTOM CURSOR
// ============================================

class CustomCursor {
  constructor() {
    this.follower = document.querySelector('.cursor-follower');
    this.dot = document.querySelector('.cursor-dot');
    if (!this.follower || !this.dot) return;
    
    this.mouseX = 0;
    this.mouseY = 0;
    this.followerX = 0;
    this.followerY = 0;
    this.dotX = 0;
    this.dotY = 0;

    this.setupEvents();
    this.animate();
  }

  setupEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Enlarge cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-item, .blog-post-item, .project-item, input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.follower.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        this.follower.classList.remove('active');
      });
    });
  }

  animate() {
    // Smooth follow for the circle
    this.followerX += (this.mouseX - this.followerX) * 0.12;
    this.followerY += (this.mouseY - this.followerY) * 0.12;
    this.follower.style.left = this.followerX + 'px';
    this.follower.style.top = this.followerY + 'px';

    // Fast follow for the dot
    this.dotX += (this.mouseX - this.dotX) * 0.5;
    this.dotY += (this.mouseY - this.dotY) * 0.5;
    this.dot.style.left = this.dotX + 'px';
    this.dot.style.top = this.dotY + 'px';

    requestAnimationFrame(() => this.animate());
  }
}


// ============================================
// SCROLL REVEAL SYSTEM
// ============================================

class ScrollRevealSystem {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Add reveal classes to various elements
    this.addRevealClass('.service-item', 'reveal');
    this.addRevealClass('.timeline-item', 'reveal');
    this.addRevealClass('.skills-item', 'reveal');
    this.addRevealClass('.blog-post-item', 'reveal-scale');
    this.addRevealClass('.project-item', 'reveal-scale');
    this.addRevealClass('.service-title', 'reveal');
    this.addRevealClass('.about-text p', 'reveal');
    this.addRevealClass('.contact-form', 'reveal');
    this.addRevealClass('.mapbox', 'reveal-scale');

    this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    this.checkElements();

    window.addEventListener('scroll', () => this.checkElements(), { passive: true });
    // Re-check when page content becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.checkElements();
    });
  }

  addRevealClass(selector, className) {
    document.querySelectorAll(selector).forEach((el, index) => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && 
          !el.classList.contains('reveal-right') && !el.classList.contains('reveal-scale')) {
        el.classList.add(className);
        el.style.transitionDelay = `${index * 0.1}s`;
      }
    });
  }

  checkElements() {
    this.elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight * 0.88) {
        el.classList.add('revealed');
      }
    });
  }

  // Call this when navigating between pages
  refresh() {
    this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    setTimeout(() => this.checkElements(), 100);
  }
}


// ============================================
// 3D TILT EFFECT
// ============================================

class TiltEffect {
  constructor() {
    this.init();
  }

  init() {
    const tiltElements = document.querySelectorAll('.service-item, .content-card, .blog-post-item > a, .project-item > a');
    
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => this.handleTilt(e, el));
      el.addEventListener('mouseleave', (e) => this.resetTilt(e, el));
    });
  }

  handleTilt(e, el) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;

    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    
    // Update CSS custom properties for spotlight effect
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
  }

  resetTilt(e, el) {
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    setTimeout(() => { el.style.transition = ''; }, 500);
  }
}


// ============================================
// ANIMATED SKILL BARS
// ============================================

class AnimatedSkills {
  constructor() {
    this.observed = false;
    this.init();
  }

  init() {
    const skillSection = document.querySelector('.skill');
    if (!skillSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.observed) {
          this.observed = true;
          this.animateSkills();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(skillSection);
  }

  animateSkills() {
    const fills = document.querySelectorAll('.skill-progress-fill');
    fills.forEach((fill, index) => {
      const targetWidth = fill.style.width;
      fill.style.width = '0%';
      
      setTimeout(() => {
        fill.classList.add('animated');
        fill.style.width = targetWidth;
      }, index * 200);
    });

    // Animate the numbers
    const dataElements = document.querySelectorAll('.skill .title-wrapper data');
    dataElements.forEach((data, index) => {
      const target = parseInt(data.value);
      setTimeout(() => {
        this.countUp(data, 0, target, 1500);
      }, index * 200);
    });
  }

  countUp(element, start, end, duration) {
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(start + (end - start) * eased);
      element.textContent = current + '%';
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }
}


// ============================================
// TYPING EFFECT 
// ============================================

class TypingEffect {
  constructor() {
    this.init();
  }

  init() {
    const nameElement = document.querySelector('.info-content .name');
    if (!nameElement) return;
    
    const fullName = nameElement.textContent.trim();
    nameElement.textContent = '';
    nameElement.setAttribute('title', fullName);
    
    // Add cursor element
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    nameElement.appendChild(cursor);
    
    this.typeText(nameElement, fullName, cursor, 0);
  }

  typeText(element, text, cursor, index) {
    if (index < text.length) {
      const textNode = document.createTextNode(text.charAt(index));
      element.insertBefore(textNode, cursor);
      
      setTimeout(() => {
        this.typeText(element, text, cursor, index + 1);
      }, 80 + Math.random() * 60);
    } else {
      // Remove cursor after 3 seconds
      setTimeout(() => {
        cursor.style.animation = 'none';
        cursor.style.opacity = '0';
        cursor.style.transition = 'opacity 0.5s ease';
      }, 3000);
    }
  }
}


// ============================================
// MAGNETIC BUTTONS
// ============================================

class MagneticButtons {
  constructor() {
    this.init();
  }

  init() {
    const buttons = document.querySelectorAll('.form-btn, .navbar-link, .social-link, .info_more-btn');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      });
    });
  }
}


// ============================================
// RIPPLE EFFECT ON CLICK
// ============================================

class RippleEffect {
  constructor() {
    this.init();
  }

  init() {
    const buttons = document.querySelectorAll('.form-btn, .navbar-link, .filter-item button, .service-item');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
}


// ============================================
// PARALLAX SCROLLING
// ============================================

class ParallaxScroll {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const canvas = document.getElementById('particles-canvas');
      if (canvas) {
        canvas.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }
}


// ============================================
// SMOOTH COUNTER ANIMATION
// ============================================

class SmoothCounter {
  constructor() {
    this.init();
  }

  init() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.counter);
          this.animate(entry.target, 0, target, 2000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  animate(element, start, end, duration) {
    const startTime = performance.now();
    const update = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(start + (end - start) * eased);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
}


// ============================================
// GLOW ON HOVER - Sidebar Card Spotlight
// ============================================

class SpotlightEffect {
  constructor() {
    this.init();
  }

  init() {
    const cards = document.querySelectorAll('.sidebar, article, .service-item');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }
}


// ============================================
// ORIGINAL FUNCTIONALITY (preserved)
// ============================================

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    }
    if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  const categoryMap = {
    "tutti": "all",
    "app mobile": "app mobile",
    "web development": "web development", 
    "backend": "backend"
  };

  const mappedValue = categoryMap[selectedValue] || selectedValue;

  for (let i = 0; i < filterItems.length; i++) {
    if (mappedValue === "all" || selectedValue === "tutti") {
      filterItems[i].classList.add("active");
    } else if (mappedValue === filterItems[i].dataset.category || selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form && form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const target = this.dataset.pageTarget;
    if (!target) return;

    // Activate the correct page
    for (let j = 0; j < pages.length; j++) {
      if (target === pages[j].dataset.page) {
        pages[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
      }
    }

    // Update active state on nav links
    for (let k = 0; k < navigationLinks.length; k++) {
      if (navigationLinks[k] === this) {
        navigationLinks[k].classList.add("active");
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }

    window.scrollTo(0, 0);
  });
}


// ============================================
// INITIALIZE ALL SYSTEMS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // 3D Particle background
  const particleCanvas = document.getElementById('particles-canvas');
  if (particleCanvas) {
    new ParticleSystem(particleCanvas);
  }

  // Custom cursor (desktop only)
  if (window.innerWidth >= 1024) {
    new CustomCursor();
  }

  // Scroll reveal animations
  const scrollRevealSystem = new ScrollRevealSystem();

  // 3D Tilt effects
  new TiltEffect();

  // Animated skill bars
  new AnimatedSkills();

  // Typing effect on name
  new TypingEffect();

  // Magnetic buttons
  if (window.innerWidth >= 1024) {
    new MagneticButtons();
  }

  // Ripple effects
  new RippleEffect();

  // Parallax scrolling
  new ParallaxScroll();

  // Smooth counters
  new SmoothCounter();

  // Spotlight/glow effect on cards
  new SpotlightEffect();

  // Re-initialize scroll reveal on page navigation
  navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => scrollRevealSystem.refresh(), 300);
    });
  });
});