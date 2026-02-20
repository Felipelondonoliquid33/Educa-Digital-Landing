document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactCarouselForm');
  const steps = form.querySelectorAll('.form-step');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const dots = document.querySelectorAll('.step-dot');
  
  let currentStep = 0;

  // Initialize
  showStep(currentStep);

  function showStep(index) {
    // Hide all steps
    steps.forEach((step, i) => {
      step.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });

    // Show current step
    steps[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    // Button Visibility
    if (index === 0) {
      prevBtn.style.visibility = 'hidden';
      nextBtn.innerHTML = 'Siguiente <i class="ph-bold ph-arrow-right"></i>';
      nextBtn.type = 'button';
    } else if (index === steps.length - 1) {
      prevBtn.style.visibility = 'visible';
      nextBtn.innerHTML = 'Enviar Solicitud <i class="ph-bold ph-paper-plane-right"></i>';
      nextBtn.type = 'submit';
    } else {
      prevBtn.style.visibility = 'visible';
      nextBtn.innerHTML = 'Siguiente <i class="ph-bold ph-arrow-right"></i>';
      nextBtn.type = 'button';
    }
  }

  function validateStep(index) {
    const currentStepEl = steps[index];
    const inputs = currentStepEl.querySelectorAll('input, select, textarea');
    let valid = true;

    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        valid = false;
        input.parentElement.classList.add('error'); // Add visual feedback
        
        // Remove error class on input
        input.addEventListener('input', function() {
            this.parentElement.classList.remove('error');
        }, { once: true });
      }
    });

    return valid;
  }

  nextBtn.addEventListener('click', function(e) {
    if (nextBtn.type === 'submit') return; // Let default submit happen
    
    e.preventDefault();
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    } else {
      // Shake animation or toast could go here
      const activeStep = steps[currentStep];
      activeStep.classList.add('shake');
      setTimeout(() => activeStep.classList.remove('shake'), 500);
    }
  });

  prevBtn.addEventListener('click', function() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  // Handle Form Submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateStep(currentStep)) {
        // Here you would normally send the data
        alert('¡Gracias! Hemos recibido tu información. Te contactaremos pronto.');
        form.reset();
        currentStep = 0;
        showStep(0);
    }
  });
});
