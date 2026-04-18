document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initial Hero Animation
    gsap.from(".hero-main-title", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2
    });

    gsap.to(".hero-bg", {
        scale: 1,
        duration: 2.5,
        ease: "power2.out"
    });

    // 2. Navbar Shrink on Scroll
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Editorial List Hover Image Swap
    const menuItems = document.querySelectorAll('.menu-item');
    const hoverImage = document.getElementById('hover-image');

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const imgSrc = item.getAttribute('data-image');
            hoverImage.src = imgSrc;
            gsap.to(hoverImage, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(hoverImage, { opacity: 0, scale: 0.95, duration: 0.4, ease: "power2.in" });
        });
        
        // Track mouse
        item.addEventListener('mousemove', (e) => {
            gsap.to(hoverImage, {
                x: e.clientX - window.innerWidth / 2 + 100, // offset
                y: e.clientY - window.innerHeight / 2,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Brutalist FAQ Interaction
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const head = card.querySelector('.faq-head');
        const body = card.querySelector('.faq-body');
        
        head.addEventListener('click', () => {
            const isActive = head.classList.contains('active');
            
            // Close all others
            faqCards.forEach(c => {
                c.querySelector('.faq-head').classList.remove('active');
                c.querySelector('.faq-body').style.maxHeight = null;
            });

            if (!isActive) {
                head.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // 6. Form Submit Sim
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = 'Communicating with Concierge...';
            setTimeout(() => {
                btn.innerText = 'Request Dispatched';
                btn.style.background = '#C5A059'; // Gold
                btn.style.color = '#FFFFFF';
            }, 1000);
        });
    }
});
