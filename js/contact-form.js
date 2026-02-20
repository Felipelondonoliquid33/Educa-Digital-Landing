// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const interestCards = document.querySelectorAll('.interest-card');
    const form = document.getElementById('contactForm');
    const selectedInterestsInput = document.getElementById('selectedInterests');
    const submitButton = form.querySelector('.submit-button');
    
    let selectedInterests = new Set();

    // Handle Interest Card Selection
    interestCards.forEach(card => {
        card.addEventListener('click', function() {
            const interest = this.getAttribute('data-interest');
            
            // Toggle selection
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedInterests.delete(interest);
            } else {
                this.classList.add('selected');
                selectedInterests.add(interest);
            }

            // Update hidden input
            selectedInterestsInput.value = Array.from(selectedInterests).join(',');
        });
    });

    // Form Submission Handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Disable button and show loading state
        submitButton.disabled = true;
        const originalText = submitButton.querySelector('span').textContent;
        submitButton.querySelector('span').textContent = 'Enviando...';

        // Prepare form data for Formspree
        const formData = new FormData(form);
        
        // Add readable interests format
        const interestsArray = Array.from(selectedInterests);
        const interestsLabels = {
            'courses': 'Desarrollo de Cursos',
            'business': 'Capacitación Empresarial',
            'webdev': 'Desarrollo Web',
            'lms': 'Plataformas LMS'
        };
        const readableInterests = interestsArray.map(key => interestsLabels[key] || key).join(', ');
        formData.set('Áreas de Interés', readableInterests || 'No seleccionó ninguna');

        // Send to Formspree
        fetch('https://formspree.io/f/meelldqn', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                form.reset();
                interestCards.forEach(card => card.classList.remove('selected'));
                selectedInterests.clear();
                selectedInterestsInput.value = '';
            } else {
                // Handle error
                return response.json().then(data => {
                    throw new Error(data.error || 'Error al enviar el formulario');
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorMessage(error.message);
        })
        .finally(() => {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.querySelector('span').textContent = originalText;
        });
    });

    // Success Message Function
    function showSuccessMessage() {
        const formContainer = document.querySelector('.contact-form-container');
        
        // Create success overlay
        const successOverlay = document.createElement('div');
        successOverlay.className = 'success-overlay';
        successOverlay.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <i class="ph-fill ph-check-circle"></i>
                </div>
                <h3>¡Mensaje Enviado!</h3>
                <p>Nos pondremos en contacto contigo muy pronto.</p>
            </div>
        `;
        
        formContainer.appendChild(successOverlay);
        
        // Fade in
        setTimeout(() => successOverlay.classList.add('show'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successOverlay.classList.remove('show');
            setTimeout(() => successOverlay.remove(), 300);
        }, 3000);
    }

    // Error Message Function
    function showErrorMessage(message) {
        const formContainer = document.querySelector('.contact-form-container');
        
        // Create error overlay
        const errorOverlay = document.createElement('div');
        errorOverlay.className = 'error-overlay';
        errorOverlay.innerHTML = `
            <div class="error-content">
                <div class="error-icon">
                    <i class="ph-fill ph-x-circle"></i>
                </div>
                <h3>Error al Enviar</h3>
                <p>${message || 'Por favor, intenta de nuevo más tarde.'}</p>
            </div>
        `;
        
        formContainer.appendChild(errorOverlay);
        
        // Fade in
        setTimeout(() => errorOverlay.classList.add('show'), 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            errorOverlay.classList.remove('show');
            setTimeout(() => errorOverlay.remove(), 300);
        }, 4000);
    }

    // Add smooth scroll to form when clicking navbar contact button
    const contactButtons = document.querySelectorAll('a[href="./contact.html"]');
    contactButtons.forEach(btn => {
        if (window.location.pathname.includes('contact.html')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector('.contact-form-section').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    });
});

// Add CSS for success overlay dynamically
const style = document.createElement('style');
style.textContent = `
    .success-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 28px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 10;
    }

    .success-overlay.show {
        opacity: 1;
    }

    .success-content {
        text-align: center;
        padding: 40px;
    }

    .success-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        animation: successScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .success-icon i {
        font-size: 48px;
        color: white;
    }

    .success-content h3 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 8px;
    }

    .success-content p {
        font-size: 1rem;
        color: #6b7280;
    }

    @keyframes successScale {
        0% { transform: scale(0); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    /* Error Overlay Styles */
    .error-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 28px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 10;
    }

    .error-overlay.show {
        opacity: 1;
    }

    .error-content {
        text-align: center;
        padding: 40px;
    }

    .error-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        animation: errorShake 0.5s ease;
    }

    .error-icon i {
        font-size: 48px;
        color: white;
    }

    .error-content h3 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 8px;
    }

    .error-content p {
        font-size: 1rem;
        color: #6b7280;
    }

    @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
