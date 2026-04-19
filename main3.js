// Safety fallback: if GSAP fails to load (e.g. CDN offline),
// make all animated elements visible immediately.
function ensureVisible() {
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // If gsap is not available (CDN timeout), fall back gracefully
    if (typeof gsap === 'undefined') {
        ensureVisible();
        initInteractions();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ── Hero elements: animate on load only, NOT re-triggered by scroll ──
    const heroFadeUps = document.querySelectorAll('.hero .fade-up');
    if (heroFadeUps.length) {
        gsap.from(heroFadeUps, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.1
        });
    }

    const heroFadeIns = document.querySelectorAll('.hero .fade-in');
    if (heroFadeIns.length) {
        gsap.from(heroFadeIns, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.3
        });
    }

    // ── All other fade-up / fade-in elements: scroll-triggered only ──
    document.querySelectorAll('.fade-up:not(.hero .fade-up)').forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 88%",
                once: true,
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });

    document.querySelectorAll('.fade-in:not(.hero .fade-in)').forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 88%",
                once: true,
                toggleActions: "play none none none"
            },
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    });

    initInteractions();
});

function initInteractions() {
    // Navbar scroll shadow
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.style.boxShadow = window.scrollY > 10
                ? "0 10px 30px rgba(0,0,0,0.05)"
                : "none";
        });
    }

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

    // Booking form
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = 'Processing...';
            setTimeout(() => {
                btn.innerText = 'Appointment Requested';
                btn.style.background = '#C5A059';
                btn.style.borderColor = '#C5A059';
                btn.style.color = '#fff';
            }, 1000);
        });
    }
}
