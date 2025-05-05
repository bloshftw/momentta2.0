document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
  });
  
  // Validación de formulario y retroalimentación mejorada del usuario
  function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Campos de entrada para validar
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const eventTypeInput = document.getElementById('eventType');
    const eventDateInput = document.getElementById('eventDate');
    
    // Agregar estilo de validación
    addValidationStyling();
    
    // Agregar oyentes de eventos para validación en tiempo real
    if (nameInput) {
      nameInput.addEventListener('blur', function() {
        validateField(this, value => value.trim().length >= 2, 'Por favor ingresa un nombre válido (mínimo 2 caracteres)');
      });
    }
    
    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        validateField(this, value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Por favor ingresa un correo electrónico válido');
      });
    }
    
    if (phoneInput) {
      phoneInput.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
          validateField(this, value => /^[0-9+\s()-]{7,15}$/.test(value), 'Por favor ingresa un número de teléfono válido');
        }
      });
    }
    
    if (eventTypeInput) {
      eventTypeInput.addEventListener('change', function() {
        validateField(this, value => value !== '', 'Por favor selecciona un tipo de evento');
      });
    }
    
    if (eventDateInput) {
      eventDateInput.addEventListener('blur', function() {
        validateField(this, value => isValidFutureDate(value), 'Por favor selecciona una fecha futura para tu evento');
      });
    }
    
    // Envío del formulario
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Validar todos los campos requeridos
      if (nameInput) {
        isValid = validateField(nameInput, value => value.trim().length >= 2, 'Por favor ingresa un nombre válido') && isValid;
      }
      
      if (emailInput) {
        isValid = validateField(emailInput, value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), 'Por favor ingresa un correo electrónico válido') && isValid;
      }
      
      if (phoneInput && phoneInput.value.trim() !== '') {
        isValid = validateField(phoneInput, value => /^[0-9+\s()-]{7,15}$/.test(value), 'Por favor ingresa un número de teléfono válido') && isValid;
      }
      
      if (eventTypeInput) {
        isValid = validateField(eventTypeInput, value => value !== '', 'Por favor selecciona un tipo de evento') && isValid;
      }
      
      if (eventDateInput) {
        isValid = validateField(eventDateInput, value => isValidFutureDate(value), 'Por favor selecciona una fecha futura para tu evento') && isValid;
      }
      
      if (isValid) {
        // El formulario es válido, mostrar estado de carga
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        if (submitBtn) {
          const originalText = submitBtn.innerText;
          submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
          submitBtn.disabled = true;
          
          // Simular envío de formulario (normalmente sería una solicitud AJAX)
          setTimeout(() => {
            // Mostrar modal de éxito
            const successModal = document.getElementById('successModal');
            if (successModal) {
              successModal.classList.add('active');
            }
            
            // Resetear formulario y botón
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Resetear estilo de validación
            const formFields = contactForm.querySelectorAll('.form-field');
            formFields.forEach(field => {
              field.classList.remove('is-valid', 'is-invalid');
              
              const errorMessage = field.querySelector('.error-message');
              if (errorMessage) {
                errorMessage.remove();
              }
            });
          }, 1500);
        }
      }
    });
  }
  
  // Ayudante de validación de campo
  function validateField(field, validationFn, errorMessage) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return true;
    
    const isValid = validationFn(field.value);
    
    // Eliminar cualquier mensaje de error existente
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      
      // Agregar mensaje de error
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.innerText = errorMessage;
      formGroup.appendChild(errorElement);
    }
    
    return isValid;
  }
  
  // Validar que la fecha sea en el futuro
  function isValidFutureDate(dateString) {
    if (!dateString) return false;
    
    const selectedDate = new Date(dateString);
    const today = new Date();
    
    // Resetear la hora para comparar solo las fechas
    today.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
  }
  
  // Agregar CSS para estilo de validación
  function addValidationStyling() {
    const style = document.createElement('style');
    style.textContent = `
      .form-group {
        position: relative;
      }
      
      input.is-invalid,
      select.is-invalid,
      textarea.is-invalid {
        border-color: var(--error-500);
      }
      
      input.is-valid,
      select.is-valid,
      textarea.is-valid {
        border-color: var(--success-500);
      }
      
      .error-message {
        color: var(--error-500);
        font-size: 0.875rem;
        margin-top: 4px;
        animation: slideIn 0.3s ease;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .loading-spinner {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    
    document.head.appendChild(style);
  }