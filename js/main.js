document.addEventListener('DOMContentLoaded', () => {
  // Atualizar ano no footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile Menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  const toggleMenu = () => {
    const isOpen = menu.classList.contains('active');
    menu.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', !isOpen);
    menu.setAttribute('aria-hidden', isOpen);
    openIcon.style.display = isOpen ? 'block' : 'none';
    closeIcon.style.display = isOpen ? 'none' : 'block';
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', toggleMenu);
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('active')) toggleMenu(); });
  }

  // Smooth Scroll & Header Scroll Effect
  const header = document.getElementById('header');
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 16;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        if (menu.classList.contains('active')) toggleMenu();
      }
    });
  });

  // Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.step-card, .benefit-card, .audience-card, .pricing-card, .success-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  // Remover preload
  window.addEventListener('load', () => document.body.classList.remove('preload'));
});