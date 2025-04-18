// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // ======= NAVIGATION =======
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    // Mobile menu toggle
    mobileToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======= PARALLAX EFFECT =======
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('mousemove', function (e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.05;
            const x = (mouseX - 0.5) * 2 * speed * 100;
            const y = (mouseY - 0.5) * 2 * speed * 100;

            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ======= HERO PARTICLES BACKGROUND =======
    const particles = document.getElementById('particles');

    function createParticles() {
        // Clear existing particles
        particles.innerHTML = '';

        // Create new particles
        const particleCount = Math.min(30, Math.floor(window.innerWidth / 40));

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.1;
            const delay = Math.random() * 10;
            const duration = Math.random() * 30 + 10;

            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            particles.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Recreate particles on window resize
    window.addEventListener('resize', function () {
        createParticles();
    });

    // ======= SCROLL ANIMATIONS =======
    const elements = document.querySelectorAll('.skills-category, .project-card, .achievement-card, .about-grid');

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply a simple fade-in without first making invisible
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing elements
    elements.forEach(element => {
        observer.observe(element);
    });

    // ======= FORM HANDLING =======
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Change button text to loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Send to Formspree using fetch API
            fetch('https://formspree.io/f/xrbprryv', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error!';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }

    // ======= SKILL ITEM ANIMATION =======
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 8px rgba(89, 50, 234, 0.3)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // ======= MICROINTERACTIONS =======
    document.querySelectorAll('.micro-interaction').forEach(element => {
        element.addEventListener('mousedown', function () {
            this.style.transform = 'scale(0.95)';
        });

        element.addEventListener('mouseup', function () {
            this.style.transform = 'scale(1)';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // ======= TYPING EFFECT IN HERO SECTION =======
    function initTypeWriter() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const originalText = heroSubtitle.getAttribute('data-text');
        const typingSpeed = 30; // milliseconds
        const heroCta = document.querySelector('.hero-cta');

        // Text is already empty initially (from HTML)

        let charIndex = 0;

        // Type one character at a time
        const typeInterval = setInterval(() => {
            if (charIndex < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);

                // Add blinking cursor at the end
                heroSubtitle.innerHTML += '<span class="cursor"></span>';

                // Show the CTA buttons when typing is complete
                setTimeout(() => {
                    heroCta.style.opacity = '1';
                    heroCta.style.transform = 'translateY(0)';
                }, 200); // Small delay after typing finishes


                // Blink cursor
                setInterval(() => {
                    const cursor = document.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                    }
                }, 500);
            }
        }, typingSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(initTypeWriter, 1000);
});

// ======= PROJECT CARDS HOVER EFFECT =======
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const img = this.querySelector('img');
        img.style.transform = 'scale(1.1)';
    });

    card.addEventListener('mouseleave', function () {
        const img = this.querySelector('img');
        img.style.transform = 'scale(1)';
    });
});

// ======= ADD CSS VARIABLE FOR SCROLL POSITION =======
window.addEventListener('scroll', () => {
    // Calculate scroll progress (0 to 1)
    const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    // Update CSS variable
    document.documentElement.style.setProperty('--scroll', scrollProgress.toString());
});

// ======= PRELOAD ANIMATION =======
window.addEventListener('load', function () {
    // Add a preloader animation if needed
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Add custom cursor (optional)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Expand cursor on interactive elements
    document.querySelectorAll('a, button, .hover-scale, .hover-glow, .micro-interaction').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('expanded');
        });

        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('expanded');
        });
    });
}

// Uncomment to enable custom cursor
// initCustomCursor();
