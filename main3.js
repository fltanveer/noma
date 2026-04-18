document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial load animations
    gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.1
    });

    gsap.from(".fade-in", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.4
    });

    // Scroll animations
    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                once: true
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Navbar interaction
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.03)";
        } else {
            nav.style.boxShadow = "none";
        }
    });

    // FAQ Accordion
    const faqRows = document.querySelectorAll('.faq-row');
    faqRows.forEach(row => {
        const question = row.querySelector('.faq-question');
        const answer = row.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');
            
            faqRows.forEach(r => {
                r.querySelector('.faq-question').classList.remove('active');
                r.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form logic
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Processing...';
            setTimeout(() => {
                btn.innerText = 'Appointment Requested';
                btn.style.background = '#C5A059';
                btn.style.borderColor = '#C5A059';
                btn.style.color = '#fff';
            }, 1000);
        });
    }
});
