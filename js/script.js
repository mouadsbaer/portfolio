// Portfolio Interactive JavaScript

// Typing Effect
const typingText = document.querySelector('.typing');
const phrases = ['UI/UX Designer', 'Web Developer', 'Creative Thinker', 'Problem Solver'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 500);
});

// Smooth scroll for navigation
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

// Active navigation highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links li');

function highlightNav() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(li => {
        li.classList.remove('active');
        const link = li.querySelector('a');
        if (link.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.portfolio-card, .timeline-item, .language-card, .skill-category');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Profile image placeholder handler
const profileImg = document.getElementById('profile-img');
if (profileImg && !profileImg.complete) {
    profileImg.addEventListener('error', function () {
        // Create a gradient placeholder if image fails to load
        this.style.background = 'linear-gradient(135deg, #3b82f6, #00d4ff)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.innerHTML = '<span style="font-size: 4rem; color: white;">A</span>';
    });
}

// Contact Form Handler with EmailJS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your Public Key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('j-oQHGNcwVTTd0frc');

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get submit button
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnContent = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span><i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Prepare template parameters
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_name: 'Mouad', // Your name
            };

            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            emailjs.send('service_m4v4kns', 'template_a859vm9', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);

                    // Show success state
                    submitBtn.innerHTML = '<span>Message Sent!</span><i class="fa-solid fa-check"></i>';
                    submitBtn.style.background = 'linear-gradient(45deg, #10b981, #34d399)';

                    // Reset form after 2 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 2000);
                }, function (error) {
                    console.log('FAILED...', error);

                    // Show error state
                    submitBtn.innerHTML = '<span>Failed to Send</span><i class="fa-solid fa-xmark"></i>';
                    submitBtn.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }
});

// Add animation to contact info cards and form
document.addEventListener('DOMContentLoaded', () => {
    const contactElements = document.querySelectorAll('.info-card, .contact-form-wrapper');
    contactElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;

        observer.observe(element);
    });
});
