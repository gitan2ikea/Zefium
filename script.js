// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
        }
    });
}

// Smooth scrolling for links
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

// Update active nav link based on page
window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.stars');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Show scroll indicator only on desktop
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && window.innerWidth > 768) {
        if (scrolled > 100) {
            scrollIndicator.classList.remove('show');
        } else {
            scrollIndicator.classList.add('show');
        }
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.script-card, .game-card, .feature-card').forEach(el => {
    observer.observe(el);
});

// Add hover effects to buttons
document.querySelectorAll('.cta-button, .get-key-btn, .unlock-btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    }
});

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF6B35, #FFB340);
        color: #000;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        font-weight: bold;
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
        max-width: 90vw;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animations to CSS dynamically if not already present
if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
}

// Detect mobile device
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Adjust for mobile-specific behaviors
window.addEventListener('resize', () => {
    const navLinks = document.getElementById('navLinks');
    if (!isMobileDevice() && navLinks) {
        navLinks.classList.remove('active');
    }
});
