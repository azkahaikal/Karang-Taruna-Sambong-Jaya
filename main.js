// Main JavaScript for Karang Taruna Sambong Jaya Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initTypedText();
    initStatsCounters();
    initProgramsCarousel();
    initScrollAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Typed Text Animation
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'Karang Taruna Sambong Jaya',
                'Generus Muda Berkarya',
                'Untuk Masyarakat'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Stats Counter Animation
function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stats-counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.floating-animation');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Programs Carousel
function initProgramsCarousel() {
    const carousel = document.getElementById('programs-carousel');
    if (carousel) {
        new Splide('#programs-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: {
                    perPage: 2,
                },
                640: {
                    perPage: 1,
                }
            }
        }).mount();
    }
}

// Scroll Animations
function initScrollAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.card-hover');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        scrollObserver.observe(element);
    });
}

// Form Validation (for contact forms)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const errorElement = input.parentNode.querySelector('.error-message');
        
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
            if (errorElement) {
                errorElement.textContent = 'Field ini wajib diisi';
                errorElement.classList.remove('hidden');
            }
        } else {
            input.classList.remove('border-red-500');
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('border-red-500');
                if (errorElement) {
                    errorElement.textContent = 'Format email tidak valid';
                    errorElement.classList.remove('hidden');
                }
            }
        }
    });
    
    return isValid;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: 300,
            opacity: 0,
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Smooth scroll for anchor links
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

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
    });
    
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        console.warn('Failed to load image:', this.src);
    });
});

// Utility function to format numbers
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Utility function to get current date in Indonesian format
function getCurrentDate() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date().toLocaleDateString('id-ID', options);
}

// Export functions for use in other pages
window.KarangTaruna = {
    validateForm,
    showNotification,
    formatNumber,
    getCurrentDate
};