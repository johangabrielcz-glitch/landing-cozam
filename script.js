// Initialize Lucide icons
lucide.createIcons();

// Floating Navigation Scroll Effect
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Logic
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Chat Demo Animation
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
    if (messageIndex < chatMessages.length) {
        const msg = chatMessages[messageIndex];
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${msg.type}`;
        bubble.textContent = msg.text;
        chatContainer.appendChild(bubble);
        
        // Auto scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        messageIndex++;
        setTimeout(addMessage, 2000); // Wait 2 seconds between messages
    } else {
        // Reset after some time
        setTimeout(() => {
            chatContainer.innerHTML = '';
            messageIndex = 0;
            addMessage();
        }, 5000);
    }
}

// Start chat demo when the section is revealed
const chatSection = document.querySelector('.chat-demo');
const chatObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        addMessage();
        chatObserver.unobserve(chatSection);
    }
}, { threshold: 0.5 });

if (chatSection) chatObserver.observe(chatSection);

// Testimonials Slider (Simple Rotation)
const testimonials = [
    {
        text: '"Redujimos nuestro tiempo de respuesta en un 80%. Ahora nuestros clientes están más felices y nosotros también."',
        author: 'Carlos M.',
        role: 'Gerente Comercial'
    },
    {
        text: '"La implementación de nuestra página web fue impecable. Las conversiones han aumentado un 40% desde el primer mes."',
        author: 'Laura G.',
        role: 'Directora de Marketing'
    },
    {
        text: '"El asistente virtual maneja el 90% de nuestras consultas diarias sin intervención humana. Es como tener un empleado que nunca duerme."',
        author: 'Andrés R.',
        role: 'Fundador de E-commerce'
    }
];

let currentTestimonial = 0;
const testimonialText = document.querySelector('.testimonial-text');
const authorName = document.querySelector('.author-info h4');
const authorRole = document.querySelector('.author-info p');

function rotateTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    const t = testimonials[currentTestimonial];
    
    const card = document.querySelector('.testimonial-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        testimonialText.textContent = t.text;
        authorName.textContent = t.author;
        authorRole.textContent = t.role;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 500);
}

setInterval(rotateTestimonials, 6000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// Savings Calculator
const leadsRange = document.getElementById('leads-range');
const leadsValue = document.getElementById('leads-value');
const hoursSaved = document.getElementById('hours-saved');
const moneySaved = document.getElementById('money-saved');

if (leadsRange) {
    leadsRange.addEventListener('input', (e) => {
        const val = e.target.value;
        leadsValue.textContent = val;
        
        // Logic: 15 mins saved per lead (0.25 hours)
        const hours = Math.round(val * 0.25);
        // Logic: $10 saved per lead
        const money = val * 10;
        
        hoursSaved.textContent = hours;
        moneySaved.textContent = `$${money.toLocaleString()}`;
    });
}
