// Interactive Formation Cards
document.addEventListener('DOMContentLoaded', function() {
    const formationCards = document.querySelectorAll('.formation-card');
    
    // Track intersections for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    formationCards.forEach(card => {
        observer.observe(card);
        
        // Add click interaction to expand/collapse
        card.addEventListener('click', function(event) {
            // Don't toggle if clicking the CTA button
            if (event.target.classList.contains('card-cta')) {
                return;
            }
            
            // Close other cards if any are open
            formationCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle this card
            card.classList.toggle('expanded');
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            card.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add CTA button click handler
        const ctaButton = card.querySelector('.card-cta');
        if (ctaButton) {
            ctaButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card toggle
                const area = card.getAttribute('data-area');
                
                // Add button feedback animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Redirect to courses page with area filter
                setTimeout(() => {
                    window.location.href = `blog.html?area=${area}`;
                }, 200);
            });
        }

        // Add mouse move parallax effect (Disabled to prevent overlap/jitter)
        /*
        card.addEventListener('mousemove', function(e) {
            // ... (code commented out)
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
        */
    });

    // Add CSS for ripple effect dynamically
    const style = document.createElement('style');
    style.textContent = `
        .formation-card {
            position: relative;
            overflow: hidden;
            /* Ensure text is above ripple */
        }
        
        /* Ensure content is above ripple */
        .card-content, .card-icon, .card-tools {
            position: relative;
            z-index: 2;
        }

        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
            transform: scale(0);
            animation: ripple 0.8s ease-out;
            pointer-events: none;
            z-index: 1; /* Below text */
        }
        
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
        
        .formation-card.clicked {
            animation: cardPulse 0.3s ease;
        }
        
        @keyframes cardPulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.02);
            }
        }
    `;
    document.head.appendChild(style);

    // Add smooth scroll behavior when cards come into view
    const grid = document.querySelector('.formation-areas-grid');
    if (grid) {
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    grid.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        gridObserver.observe(grid);
    }

    // Stats counter animation for tool badges
    // Badges removed, so we remove this logic as well to avoid errors
    // const badges = document.querySelectorAll('.tool-badge');
    // ...

    // Add global animation style
    const globalStyle = document.createElement('style');
    globalStyle.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(globalStyle);
});
