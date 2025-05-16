// Set padding-top for body to prevent content overlap with fixed navbar
function setBodyPadding() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    document.body.style.paddingTop = `${navbarHeight}px`;
}

// Function to set the active tab
function setActiveTab() {
    const hash = window.location.hash || '#home';
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-item');
    const sidebarLinks = document.querySelectorAll('.offcanvas .nav-item');

    navbarLinks.forEach(link => link.classList.remove('active'));
    sidebarLinks.forEach(link => link.classList.remove('active'));

    const activeNavbarLink = document.querySelector(`.navbar-nav .nav-link[href="${hash}"]`);
    const activeSidebarLink = document.querySelector(`.offcanvas .nav-link[href="${hash}"]`);

    if (activeNavbarLink) {
        activeNavbarLink.parentElement.classList.add('active');
    }
    if (activeSidebarLink) {
        activeSidebarLink.parentElement.classList.add('active');
    }
}

// Rotate captions
function rotateCaptions() {
    const captionElement = document.querySelector('.hero-section .caption');
    const captions = [
        "Where Style Meets Precision",
        "Your Look, Our Craft",
        "Unleash Your Best Self"
    ];
    let currentIndex = 0;

    captionElement.textContent = captions[currentIndex];

    setInterval(() => {
        currentIndex = (currentIndex + 1) % captions.length;
        captionElement.textContent = captions[currentIndex];
    }, 3000);
}

// Intersection Observer for section visibility (active tab and animations)
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = `#${entry.target.id}`;
            history.replaceState(null, null, sectionId);
            setActiveTab();

            // Animate cards and elements when section is in view
            if (entry.target.id === 'about') {
                const image = entry.target.querySelector('.about-image');
                const card = entry.target.querySelector('.card');
                const divider = entry.target.querySelector('.divider');
                const headings = entry.target.querySelectorAll('h3');
                const paragraphs = entry.target.querySelectorAll('p');
                if (image) image.classList.add('visible');
                if (card) card.classList.add('visible');
                if (divider) divider.classList.add('visible');
                headings.forEach(h => h.classList.add('visible'));
                paragraphs.forEach(p => p.classList.add('visible'));
            }
            if (entry.target.id === 'services') {
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach(card => {
                    card.classList.add('visible');
                    const headings = card.querySelectorAll('h3');
                    const paragraphs = card.querySelectorAll('p');
                    const dividers = card.querySelectorAll('.divider');
                    const tableRows = card.querySelectorAll('.hours-table tr');
                    headings.forEach(h => h.classList.add('visible'));
                    paragraphs.forEach(p => p.classList.add('visible'));
                    dividers.forEach(d => d.classList.add('visible'));
                    tableRows.forEach(row => row.classList.add('visible'));
                });
            }
            if (entry.target.id === 'gallery') {
                const description = entry.target.querySelector('p.description');
                const headings = entry.target.querySelectorAll('h3');
                const divider = entry.target.querySelector('.divider');
                const galleryCards = entry.target.querySelectorAll('.gallery-card');
                const reviewCards = entry.target.querySelectorAll('.review-card');
                if (description) description.classList.add('visible');
                headings.forEach(h => h.classList.add('visible'));
                if (divider) divider.classList.add('visible');
                galleryCards.forEach(card => {
                    card.classList.add('visible');
                    const caption = card.querySelector('.caption');
                    if (caption) caption.classList.add('visible');
                });
                reviewCards.forEach(card => {
                    card.classList.add('visible');
                    const reviewText = card.querySelector('.review-text');
                    const attribution = card.querySelector('.attribution');
                    if (reviewText) reviewText.classList.add('visible');
                    if (attribution) attribution.classList.add('visible');
                });
            }
            if (entry.target.id === 'contact') {
                const form = entry.target.querySelector('.contact-form');
                const info = entry.target.querySelector('.contact-info');
                if (form) form.classList.add('visible');
                if (info) info.classList.add('visible');
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Trigger animation for shop name and text below on page load
window.addEventListener('load', function() {
    setBodyPadding();

    const logo = document.querySelector('.hero-section .logo');
    logo.classList.add('animate');

    const heading = document.querySelector('.hero-section h1');
    heading.classList.add('animate');

    rotateCaptions();

    const lead = document.querySelector('.hero-section .lead');
    const text = "Best barbers in Denton, Texas";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            lead.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        } else {
            lead.style.opacity = 1;
        }
    }

    setTimeout(typeWriter, 1500);

    setActiveTab();
});

window.addEventListener('resize', setBodyPadding);

window.addEventListener('hashchange', setActiveTab);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelector('.btn-toggle-sidebar').addEventListener('click', function() {
    console.log('Sidebar toggle clicked');
});
document.querySelector('.btn-primary').addEventListener('click', function() {
    console.log('Call Us button clicked');
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    document.getElementById('appointment-date').setAttribute('min', minDate);

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset previous validation states
            const inputs = contactForm.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.classList.remove('is-invalid');
                const feedback = input.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.style.display = 'none';
                }
            });

            // Validate form fields
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const appointmentDate = document.getElementById('appointment-date').value;
            const appointmentTime = document.getElementById('appointment-time').value;

            // Name validation
            if (!name) {
                const nameInput = document.getElementById('name');
                nameInput.classList.add('is-invalid');
                nameInput.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailPattern.test(email)) {
                const emailInput = document.getElementById('email');
                emailInput.classList.add('is-invalid');
                emailInput.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // Phone validation
            const phonePattern = /^\+?\d{10,15}$/;
            if (!phone || !phonePattern.test(phone)) {
                const phoneInput = document.getElementById('phone');
                phoneInput.classList.add('is-invalid');
                phoneInput.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // Appointment date validation
            const selectedDate = new Date(appointmentDate);
            if (!appointmentDate || selectedDate < today) {
                const dateInput = document.getElementById('appointment-date');
                dateInput.classList.add('is-invalid');
                dateInput.nextElementSibling.style.display = 'block';
                isValid = false;
            }

            // Appointment time validation
            if (!appointmentTime) {
                const timeInput = document.getElementById('appointment-time');
                timeInput.classList.add('is-invalid');
                timeInput.nextElementSibling.style.display = 'block';
                isValid = false;
            } else {
                // Check if the time is within operating hours (9 AM - 7 PM, Mon-Fri; 10 AM - 6 PM, Sat)
                const [hours, minutes] = appointmentTime.split(':').map(Number);
                const dayOfWeek = selectedDate.getDay();
                if (dayOfWeek === 0) { // Sunday
                    const timeInput = document.getElementById('appointment-time');
                    timeInput.classList.add('is-invalid');
                    timeInput.nextElementSibling.textContent = 'We are closed on Sundays.';
                    timeInput.nextElementSibling.style.display = 'block';
                    isValid = false;
                } else if (dayOfWeek === 6) { // Saturday
                    if (hours < 10 || (hours >= 18 && minutes > 0)) {
                        const timeInput = document.getElementById('appointment-time');
                        timeInput.classList.add('is-invalid');
                        timeInput.nextElementSibling.textContent = 'Please select a time between 10 AM and 6 PM on Saturdays.';
                        timeInput.nextElementSibling.style.display = 'block';
                        isValid = false;
                    }
                } else { // Monday to Friday
                    if (hours < 9 || (hours >= 19 && minutes > 0)) {
                        const timeInput = document.getElementById('appointment-time');
                        timeInput.classList.add('is-invalid');
                        timeInput.nextElementSibling.textContent = 'Please select a time between 9 AM and 7 PM.';
                        timeInput.nextElementSibling.style.display = 'block';
                        isValid = false;
                    }
                }
            }

            if (isValid) {
                // Simulate form submission (in a real scenario, this would be an API call)
                console.log('Form submitted:', {
                    name,
                    email,
                    phone,
                    appointmentDate,
                    appointmentTime,
                    message: document.getElementById('message').value.trim()
                });

                // Show success message
                successMessage.classList.remove('d-none');
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('d-none');
                }, 5000);
            }
        });
    }
});