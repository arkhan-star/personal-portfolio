// 1. AOS (Animate On Scroll)
AOS.init({ duration: 700, once: true, offset: 80 });

// 2. Nav scroll effect — darkens header after 60px of scroll
const siteHeader = document.querySelector('header.fixed-top');
if (siteHeader) {
    window.addEventListener('scroll', () => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// 3. Hero parallax — background moves slower than scroll
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        hero.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.35}px)`;
    });
}

// 4. Number counter — counts up when metric enters viewport
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const useComma = el.dataset.format === 'comma';
    const duration = 1500;
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = Math.round(eased * target);
        el.textContent = prefix + (useComma ? value.toLocaleString() : value) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// 5. VanillaTilt — 3D tilt + subtle scale on project and testimonial cards
VanillaTilt.init(document.querySelectorAll('#projects .card, #testimonials .card'), {
    max: 8,
    speed: 400,
    scale: 1.03,
    glare: false
});
