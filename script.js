// Initialize Lucide icons
lucide.createIcons();

// =============================================
// PARTICLE CANVAS — Animated tech background
// =============================================
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const PARTICLE_COUNT = 70;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = document.querySelector('.hero').offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.4;
            this.speedX = (Math.random() - 0.5) * 0.7;
            this.speedY = (Math.random() - 0.5) * 0.7;
            this.opacity = Math.random() * 0.45 + 0.08;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    this.x += (dx / dist) * 2.2;
                    this.y += (dy / dist) * 2.2;
                }
            }
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 194, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 194, 255, ${0.07 * (1 - dist / 140)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    document.querySelector('.hero').addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    document.querySelector('.hero').addEventListener('mouseleave', () => {
        mouse.x = null; mouse.y = null;
    });
}

// =============================================
// NAVIGATION — Scroll + Theme + Mobile
// =============================================
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled', 'nav-light');
        return;
    }

    const elements = document.elementsFromPoint(window.innerWidth / 2, 55);
    const sectionBelow = elements.find(el =>
        !el.closest('#main-nav') &&
        (el.closest('section') || el.closest('footer') || el.closest('.marquee-wrapper'))
    );
    const targetSection = sectionBelow
        ? sectionBelow.closest('section, footer, .marquee-wrapper')
        : null;
    const theme = targetSection
        ? (targetSection.getAttribute('data-nav-theme') || 'dark')
        : 'dark';

    nav.classList.toggle('nav-light', theme === 'light');
});

// Mobile nav toggle
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    function openMenu() {
        navLinks.classList.add('mobile-open');
        nav.classList.add('menu-open');
        mobileToggle.innerHTML = '<i data-lucide="x"></i>';
        lucide.createIcons();
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        navLinks.classList.remove('mobile-open');
        nav.classList.remove('menu-open');
        mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
        document.body.style.overflow = '';
    }

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.contains('mobile-open') ? closeMenu() : openMenu();
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', closeMenu);
    });
}

// =============================================
// TYPING EFFECT — Hero subtitle
// =============================================
const typingEl = document.getElementById('typing-text');
if (typingEl) {
    const phrases = [
        'Asistentes virtuales inteligentes.',
        'Páginas web que convierten.',
        'Apps que automatizan todo.',
        'Tecnología que escala tu negocio.'
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIdx--);
            if (charIdx < 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
            setTimeout(type, 28);
        } else {
            typingEl.textContent = current.substring(0, charIdx++);
            if (charIdx > current.length) {
                isDeleting = true;
                setTimeout(type, 2200);
            } else {
                setTimeout(type, 55);
            }
        }
    }
    setTimeout(type, 1200);
}

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// =============================================
// SCROLL REVEAL
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// =============================================
// 3D TILT CARDS
// =============================================
document.querySelectorAll('.solution-card, .step-card, .case-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = (y - cy) / 22;
        const rotY = (cx - x) / 22;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// =============================================
// MAGNETIC BUTTONS
// =============================================
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// =============================================
// PARALLAX BLOBS
// =============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.bg-blob').forEach((blob, i) => {
        const speed = i % 2 === 0 ? 0.025 : -0.018;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// =============================================
// CHAT DEMO ANIMATION
// =============================================
const chatMessages = [
    { type: 'bot', text: '¡Hola! Bienvenido a COZAM Technologies. ¿En qué podemos ayudarte hoy?' },
    { type: 'user', text: 'Hola, me gustaría automatizar mi WhatsApp de ventas.' },
    { type: 'bot', text: '¡Excelente! Nuestros asistentes virtuales pueden calificar clientes y cerrar ventas 24/7.' },
    { type: 'bot', text: '¿Deseas agendar una demo gratuita?' },
    { type: 'user', text: 'Sí, me interesa mucho.' },
    { type: 'bot', text: '¡Perfecto! Un especialista se pondrá en contacto contigo en breve.' }
];

const chatContainer = document.getElementById('chat-demo-container');
let messageIndex = 0;

function addMessage() {
    if (!chatContainer) return;
    if (messageIndex < chatMessages.length) {
        const msg = chatMessages[messageIndex];
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${msg.type}`;
        bubble.textContent = msg.text;
        chatContainer.appendChild(bubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        messageIndex++;
        setTimeout(addMessage, 2000);
    } else {
        setTimeout(() => {
            chatContainer.innerHTML = '';
            messageIndex = 0;
            addMessage();
        }, 5000);
    }
}

const chatSection = document.querySelector('.chat-demo');
const chatObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        addMessage();
        chatObserver.unobserve(chatSection);
    }
}, { threshold: 0.4 });

if (chatSection) chatObserver.observe(chatSection);

// =============================================
// FAQ ACCORDION
// =============================================
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// =============================================
// SAVINGS CALCULATOR
// =============================================
const leadsRange = document.getElementById('leads-range');
const leadsValue = document.getElementById('leads-value');
const hoursSaved = document.getElementById('hours-saved');
const moneySaved = document.getElementById('money-saved');

if (leadsRange) {
    leadsRange.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        leadsValue.textContent = val.toLocaleString();
        hoursSaved.textContent = Math.round(val * 0.25);
        moneySaved.textContent = `$${(val * 10).toLocaleString()}`;
    });
}

// =============================================
// ANIMATED COUNTERS
// =============================================
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();
    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }
    requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('.stat-number');
if (counterEls.length) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));
}

// =============================================
// MOUSE GLOW TRACKER
// =============================================
const glowFollower = document.getElementById('mouse-glow');
if (glowFollower) {
    document.addEventListener('mousemove', (e) => {
        glowFollower.style.left = e.clientX + 'px';
        glowFollower.style.top = e.clientY + 'px';
    });
}

// =============================================
// SCROLL PROGRESS BAR
// =============================================
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
    });
}

// =============================================
// CONTACT FORM → WhatsApp
// =============================================
const WA_NUMBER = '584124779301';
const contactForm = document.getElementById('contact-form');
const submitBtn  = document.getElementById('form-submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name     = document.getElementById('name').value.trim();
        const email    = document.getElementById('email').value.trim();
        const interestEl = document.getElementById('interest');
        const interest = interestEl.selectedIndex > 0
            ? interestEl.options[interestEl.selectedIndex].text
            : 'No especificado';
        const message  = contactForm.querySelector('textarea[name="message"]').value.trim();

        const lines = [
            '👋 Hola COZAM, les escribo desde su página web.',
            '',
            `*Nombre:* ${name}`,
            `*Email:* ${email}`,
            `*Me interesa:* ${interest}`,
        ];
        if (message) lines.push(`*Mensaje:* ${message}`);

        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    });
}
