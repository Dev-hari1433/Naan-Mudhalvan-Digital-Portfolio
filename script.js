document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Effect for Hero Section ---
    const roles = ["AI Intern", "Cloud Computing Enthusiast", "Machine Learning Developer","Full Stack Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    const typingElement = document.querySelector('.typing-effect');
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        let displayText;

        if (isDeleting) {
            displayText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        typingElement.textContent = displayText;

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at the end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, typeSpeed);
    }
    
    type();

    // --- Intersection Observer for Animations ---
    const hiddenElements = document.querySelectorAll('.section-hidden');
    const skillBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate sections fading in
                entry.target.classList.add('section-visible');

                // Animate skill bars
                if (entry.target.id === 'skills') {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-percent');
                        bar.style.width = targetWidth + '%';
                    });
                }
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of the element is visible
    });

    hiddenElements.forEach(el => observer.observe(el));
});