// NOMA - Functional Interactivity Engine

document.addEventListener('DOMContentLoaded', () => {
  // 1. GSAP Registration
  gsap.registerPlugin(ScrollTrigger);

  // 2. Swiper Initialization
  const swiper = new Swiper('.product-carousel', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    }
  });

  // 2. Hero Section (On Load Entrance Only)
  const heroTl = gsap.timeline();
  heroTl.from(".hero-bg-text", { opacity: 0, y: 100, duration: 1.5, ease: "power4.out" })
        .from("#hero-title", { opacity: 0, y: 50, duration: 1, ease: "power3.out" }, "-=1")
        .from("#hero-desc", { opacity: 0, y: 30, duration: 1, ease: "power3.out" }, "-=0.8")
        .from(".hero-btns", { opacity: 0, y: 20, duration: 1, ease: "power3.out" }, "-=0.6")
        .from(".hero-image-v2", { 
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", 
          duration: 1.5, 
          ease: "power4.inOut" 
        }, "-=1.2");

  // 3. Navbar scroll effect
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const nav = document.getElementById('navbar');
    if (winScroll > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  // 4. FAQ Accordion Logic
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const active = document.querySelector('.faq-item.active');
      if (active && active !== item) {
        active.classList.remove('active');
        active.querySelector('i').classList.replace('fa-minus', 'fa-plus');
      }
      
      item.classList.toggle('active');
      const icon = item.querySelector('i');
      if (item.classList.contains('active')) {
        icon.classList.replace('fa-plus', 'fa-minus');
      } else {
        icon.classList.replace('fa-minus', 'fa-plus');
      }
    });
  });

  // 5. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Form Submission Simulation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      btn.innerText = 'Transmitting...';
      setTimeout(() => {
        btn.innerText = 'Request Received';
        btn.style.backgroundColor = '#c5a059';
        contactForm.reset();
        setTimeout(() => {
          btn.innerText = 'Send Request';
          btn.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    });
  }
});
