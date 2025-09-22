// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dynamic navigation background
// Dynamic navigation background (with smooth transitions)
const nav = document.querySelector('nav');

if (nav) {
    // Add CSS transitions for a smoother background change
    nav.style.transition = 'background-color 300ms ease, box-shadow 300ms ease, backdrop-filter 300ms ease';
    // In case Tailwind is used, these help too (harmless otherwise)
    nav.classList.add('transition-colors', 'duration-300', 'ease-out');
}

// Throttle updates with requestAnimationFrame to avoid jank on scroll
let navSolid = false;
let navTicking = false;

function updateNavBackground() {
    if (!nav) return;
    const shouldBeSolid = window.scrollY > 50;

    if (shouldBeSolid !== navSolid) {
        if (shouldBeSolid) {
            nav.classList.add('bg-black', 'bg-opacity-90', 'shadow-lg');
            // Subtle blur behind the navbar if supported (Tailwind or custom CSS)
            nav.classList.add('backdrop-blur');
        } else {
            nav.classList.remove('bg-black', 'bg-opacity-90', 'shadow-lg', 'backdrop-blur');
        }
        navSolid = shouldBeSolid;
    }
    navTicking = false;
}

window.addEventListener('scroll', () => {
    if (!nav) return;
    if (!navTicking) {
        navTicking = true;
        requestAnimationFrame(updateNavBackground);
    }
});

// Initialize on load
updateNavBackground();


// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('#intro');
    if (parallax) {
        const yPos = -(scrolled * 0.5);
        parallax.style.transform = `translateY(${yPos}px)`;
    }
});

// Add floating particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDuration = Math.random() * 20 + 10 + 's';
    particle.style.opacity = Math.random() * 0.3;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 30000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// Texts
const typewriterText = "Hi, I'm ";
const nameText = "Valdrich Eagan";

let i = 0; // index for first part
let j = 0; // index for second part
let isFirstDone = false;

function typeWriter() {
  const h1 = document.querySelector('#intro h1');
  if (!h1) return;

  // If we’re still typing the first part
  if (!isFirstDone) {
    if (i <= typewriterText.length) {
      const txt = typewriterText.substring(0, i);
      h1.innerHTML = txt + '<span class="opacity-50">|</span>';
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // First part done, move to second
      isFirstDone = true;
      setTimeout(typeWriter, 300); // little pause
    }
  } else {
    // Typing the name part
    if (j <= nameText.length) {
      const namePart = nameText.substring(0, j);
      h1.innerHTML = 
        `${typewriterText}<span class="gradient-text">${namePart}</span><span class="opacity-50">|</span>`;
      j++;
      setTimeout(typeWriter, 200);
    } else {
      // Finished typing everything
      h1.innerHTML = 
        `${typewriterText}<span class="gradient-text">${nameText}</span>`;
    }
  }
}

// Call once on page load
typeWriter();


// Start typewriter effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Project cards hover effect
const projectCards = document.querySelectorAll('#projects .glass');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add magnetic effect to buttons
const magneticButtons = document.querySelectorAll('.hover-lift');
magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const counters = entry.target.querySelectorAll('.text-3xl');
            counters.forEach(counter => {
                const text = counter.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    animateCounter(counter, number);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('#about .grid.grid-cols-2');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add cursor follower
const cursor = document.createElement('div');
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid rgba(102, 126, 234, 0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease-out;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Scale cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .hover-lift');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = 'rgba(118, 75, 162, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'rgba(102, 126, 234, 0.5)';
    });
});

// Hide cursor on mobile devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
}

window.history.scrollRestoration = 'manual';
window.addEventListener('load', () => {
    // Immediately set the scroll position at the very top
    window.scrollTo(0, 0);
});
