// Advanced animations using GSAP
// Add this script tag before the closing </body> tag: 
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

document.addEventListener('DOMContentLoaded', function () {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        initPageTransitions();
        initScrollAnimations();
        initParallaxEffects();
        initTextAnimations();
    }

    // Page load animations
    function initPageTransitions() {
        // Timeline for page load
        const tl = gsap.timeline();

        tl.to('.preloader', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => document.querySelector('.preloader').style.display = 'none'
        });

        tl.from('.navbar', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.2');

        tl.from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');

        tl.from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6');

        tl.from('.hero-cta', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6');

        tl.from('.scroll-indicator', {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');

        // Add character-by-character animation to the hero title
        animateCharacters('.hero-title');
    }

    // Scroll animations
    function initScrollAnimations() {
        // Comment out all these animations to prevent conflicts
        /*
        // About section animation
        gsap.from('.about-grid', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        });
        
        // Skills categories animation
        gsap.from('.skills-category', {...});
        
        // Project cards animation
        gsap.from('.project-card', {...});
        
        // Achievement cards animation
        gsap.from('.achievement-card', {...});
        
        // Contact section animation
        gsap.from('.contact-info, .contact-form', {...});
        */

        // Keep only the section titles animation
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    // Parallax effects
    function initParallaxEffects() {


        // Skills section background parallax
        gsap.to('.skills', {
            backgroundPosition: `50% ${window.innerHeight / 2}px`,
            ease: 'none',
            scrollTrigger: {
                trigger: '.skills',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Text animations
    function initTextAnimations() {
        // Replace the problematic pseudo-element selector
        gsap.utils.toArray('h2').forEach(heading => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Create a separate element instead of animating ::after pseudo element
            const headingAfter = heading.parentNode.querySelector('h2::after');
            if (headingAfter) {
                tl.from(headingAfter, {
                    width: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                }, 0.3);
            }
        });
    }

    // Character by character animation
    function animateCharacters(selector) {
        const element = document.querySelector(selector);
        if (!element) return;

        const text = element.textContent;
        element.innerHTML = ''; // Use innerHTML rather than textContent to clear

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            element.appendChild(span);
        }

        const spans = element.querySelectorAll('span');
        if (spans.length > 0) {
            gsap.from(spans, {
                opacity: 0,
                y: 20,
                rotationX: 45,
                stagger: 0.05,
                duration: 0.8,
                ease: 'power2.out',
                delay: 0.5
            });
        }
    }

    // Update scroll progress bar
    function updateScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (!scrollProgress) return;

        gsap.to(scrollProgress, {
            scaleX: window.scrollY / (document.body.scrollHeight - window.innerHeight),
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    // Update scroll progress on scroll
    window.addEventListener('scroll', updateScrollProgress);

    // Mouse movement parallax for hero section
    document.addEventListener('mousemove', e => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        gsap.to('.hero-title', {
            x: mouseX * 20,
            y: mouseY * 20,
            duration: 0.8,
            ease: 'power2.out'
        });

        gsap.to('.hero-subtitle', {
            x: mouseX * 10,
            y: mouseY * 10,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Particles follow mouse with varying speeds
        document.querySelectorAll('.particle').forEach((particle, i) => {
            const speed = i % 3 === 0 ? 5 : i % 3 === 1 ? 10 : 15;
            gsap.to(particle, {
                x: mouseX * speed,
                y: mouseY * speed,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });

    // Replace the existing skill item animation code with this container-level animation

    // Remove individual skill item animations
    gsap.utils.toArray('.skill-item').forEach((skill, i) => {
        // Remove the existing animation and make all items visible
        skill.style.opacity = '1';
        skill.style.width = 'auto';
    });

    // Add fade-in animation for the entire skills category containers
    gsap.utils.toArray('.skills-category').forEach((category) => {
        gsap.from(category, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: category,
                start: 'top 90%'
            }
        });
    });

    // Magnetic effect for buttons - only on desktop
    document.querySelectorAll('.btn').forEach(btn => {
        // Check if we're on desktop (screen width greater than 768px)
        const isDesktop = () => window.innerWidth > 768;
        
        btn.addEventListener('mousemove', e => {
            // Only apply effect on desktop
            if (isDesktop()) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                gsap.to(btn, {
                    x: (x - rect.width / 2) / 10,
                    y: (y - rect.height / 2) / 10,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });

        btn.addEventListener('mouseleave', () => {
            // Always reset position (works on any device if somehow activated)
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
        
        // Handle window resize to reset button position if resizing to mobile
        window.addEventListener('resize', () => {
            if (!isDesktop()) {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.1
                });
            }
        });
    });

    // Initialize particles
    initParticlesBackground();


});

// Add a safety check for the particles animation
function initParticlesBackground() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && typeof particlesJS !== 'undefined') {
        particlesJS('particles', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                opacity: { value: 0.2, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 2 },
                move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } }
            },
            retina_detect: true  // Important for high-density screens
        });
    }
}
