// Initialize Particles.js
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: "#0ea5e9" },
            shape: { type: "circle" },
            opacity: { value: 0.15, random: true },
            size: { value: 1.5, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 0.6, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: { detect_on: "canvas", events: { onhover: { enable: true, mode: "bubble" } } },
        retina_detect: true
    });
}

// Cursor Glow Interaction
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }
    
    // Parallax for Background Blobs
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    document.querySelectorAll('.bg-blob').forEach((blob, i) => {
        const factor = (i + 1) * 40;
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });

    document.querySelectorAll('.micro-el').forEach((el, i) => {
        const factor = (i + 1) * 15;
        el.style.transform = `translate(${x * factor}px, ${y * factor}px) rotate(${x * 20}deg)`;
    });
});

// Scroll Progress & Background Shift
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        // Dynamic background opacity shift
        document.body.style.backgroundPosition = `0 ${scrollPx * 0.1}px`;
    }
});

// Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Strategy Selector Logic
const strategies = {
    ventas: {
        title: "Estrategia de Ventas Agresiva",
        desc: "Optimizamos el bot para cierres rápidos, recuperación de carritos y ofertas relámpago automáticas.",
        stat1: "+55%",
        stat2: "24/7"
    },
    soporte: {
        title: "Soporte Técnico de Alta Disponibilidad",
        desc: "Reducimos el tiempo de respuesta a cero, manejando dudas frecuentes y escalando solo casos críticos.",
        stat1: "-80%",
        stat2: "0ms"
    },
    inventario: {
        title: "Control de Inventario Inteligente",
        desc: "Sincronizamos tu stock físico con WhatsApp y Web en tiempo real, evitando ventas sin existencias.",
        stat1: "100%",
        stat2: "Real-time"
    }
};

window.selectStrategy = function(type) {
    const data = strategies[type];
    const card = document.getElementById('strategy-result');
    const title = document.getElementById('strategy-title');
    const desc = document.getElementById('strategy-desc');
    const s1 = document.getElementById('strategy-stat-1');
    const s2 = document.getElementById('strategy-stat-2');

    document.querySelectorAll('.strategy-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(type)) btn.classList.add('active');
    });

    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        title.innerText = data.title;
        desc.innerText = data.desc;
        s1.innerText = data.stat1;
        s2.innerText = data.stat2;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 300);
};

// Configurator Score Animation
const checks = document.querySelectorAll('.config-check');
const scoreValue = document.getElementById('score-value');

function updateScore() {
    let total = 0;
    checks.forEach(c => {
        if (c.checked) total += parseInt(c.value);
    });
    
    const current = parseInt(scoreValue.innerText || "0");
    const target = total;
    let start = current;
    const duration = 500;
    const startTime = performance.now();
    
    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const val = Math.floor(start + (target - start) * progress);
        scoreValue.innerText = val;
        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

checks.forEach(c => c.addEventListener('change', updateScore));

// Chat Loop
const chatMessages = [
    { type: 'bot', text: '¡Bienvenido a COZAM! 👋' },
    { type: 'user', text: '¿Automatizan tiendas?' },
    { type: 'bot', text: 'Sí, WhatsApp y Web 24/7.' },
    { type: 'bot', text: '¿Deseas una demo?' }
];

const chatContainer = document.getElementById('chat-messages');

async function runChat() {
    if (!chatContainer) return;
    chatContainer.innerHTML = '';
    for (const msg of chatMessages) {
        await new Promise(r => setTimeout(r, 2000));
        const div = document.createElement('div');
        div.className = 'chat-bubble';
        div.style.padding = '0.5rem 0.8rem';
        div.style.borderRadius = '14px';
        div.style.fontSize = '0.8rem';
        div.style.maxWidth = '85%';
        div.style.background = msg.type === 'user' ? '#F1F5F9' : 'rgba(14, 165, 233, 0.1)';
        div.style.color = msg.type === 'user' ? '#475569' : '#0EA5E9';
        div.style.alignSelf = msg.type === 'user' ? 'flex-end' : 'flex-start';
        div.textContent = msg.text;
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    setTimeout(runChat, 5000);
}

runChat();
