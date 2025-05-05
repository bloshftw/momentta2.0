document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los componentes
    initNavbar();
    initScrollReveal();
    initFAQAccordions();
    initContactForm();
    initModalHandlers();
  });
  
  // Funcionalidad de la barra de navegación
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuLinks = document.querySelectorAll('.nav-link');
    
    // Manejar eventos de desplazamiento para el estilo de la barra de navegación
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    
    // Activar el evento de desplazamiento al cargar la página
    window.dispatchEvent(new Event('scroll'));
    
    // Alternar menú móvil
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
    
    // Cerrar menú móvil cuando se hace clic en un enlace
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
      });
    });
  }
  
  // Animaciones de revelación al desplazarse
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
      for (let i = 0; i < revealElements.length; i++) {
        const element = revealElements[i];
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      }
    }
    
    window.addEventListener('scroll', checkReveal);
    
    // Activar al cargar inicialmente
    checkReveal();
  }
  
  // Acordeones de Preguntas Frecuentes
  function initFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', () => {
          // Si el elemento clicado ya está activo, cerrarlo
          if (item.classList.contains('active')) {
            item.classList.remove('active');
            return;
          }
          
          // Cerrar todos los demás FAQ abiertos
          faqItems.forEach(faq => {
            faq.classList.remove('active');
          });
          
          // Abrir el FAQ clicado
          item.classList.add('active');
        });
      }
    });
  }
  
  // Manejo del formulario de contacto
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const successModal = document.getElementById('successModal');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Normalmente aquí enviarías los datos del formulario a tu servidor
        
        // Mostrar mensaje de éxito (usando modal para esta demo)
        if (successModal) {
          successModal.classList.add('active');
        } else if (formSuccess) {
          // Mensaje de éxito alternativo si no hay modal
          formSuccess.classList.add('active');
        }
        
        // Restablecer formulario
        contactForm.reset();
      });
    }
  }
  
  // Manejadores de Modal
  function initModalHandlers() {
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const confirmCloseBtn = document.getElementById('closeModal');
    
    if (modal) {
      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
          modal.classList.remove('active');
        });
      }
      
      if (confirmCloseBtn) {
        confirmCloseBtn.addEventListener('click', () => {
          modal.classList.remove('active');
        });
      }
      
      // Cerrar modal al hacer clic fuera del contenido
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
      
      // Cerrar modal con tecla escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          modal.classList.remove('active');
        }
      });
    }
  }