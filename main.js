// js/main.js
import { initMobileMenu } from './modules/mobile-menu.js';
import { initFaqAccordion } from './modules/faq-accordion.js';
import { initCounters } from './modules/counter-animation.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initPricingToggle } from './modules/pricing-toggle.js';
import { initHeaderScroll } from './modules/header-scroll.js';

// Inicialização única após DOM pronto
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFaqAccordion();
  initCounters();
  initScrollReveal();
  initPricingToggle();
  initHeaderScroll();
  
  // Smooth scroll para links internos (fallback nativo CSS scroll-behavior já faz, mas garante offset do header)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - 16;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        // Fechar mobile menu se aberto
        const nav = document.getElementById('main-nav');
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          document.body.classList.remove('nav-open');
          document.querySelector('.nav-overlay')?.classList.remove('is-visible');
          document.getElementById('hamburger-btn').setAttribute('aria-expanded', 'false');
        }
        target.focus({ preventScroll: true }); // Acessibilidade
      }
    });
  });
});
