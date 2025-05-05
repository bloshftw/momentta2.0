document.addEventListener('DOMContentLoaded', function() {
    initEstilosSlider();
    initTestimonialsSlider();
  });
  
  // Configuración del slider de estilos
  function initEstilosSlider() {
    const estilosSlider = document.querySelector('.estilos-slider');
    
    if (!estilosSlider) return;
    
    new Swiper('.estilos-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.estilos-slider .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.estilos-slider .swiper-button-next',
        prevEl: '.estilos-slider .swiper-button-prev',
      },
      breakpoints: {
        // Cuando el ancho de la ventana es >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // Cuando el ancho de la ventana es >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      on: {
        init: function() {
          // Inicializar efectos hover para diapositivas visibles
          handleSlideHoverEffects();
        },
        slideChange: function() {
          // Actualizar efectos hover después de los cambios de diapositiva
          handleSlideHoverEffects();
        }
      }
    });
  }
  
  // Configuración del slider de testimonios
  function initTestimonialsSlider() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (!testimonialsSlider) return;
    
    new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.testimonials-slider .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        // Cuando el ancho de la ventana es >= 768px
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        // Cuando el ancho de la ventana es >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
      effect: 'slide',
      speed: 800,
    });
  }
  
  // Manejar efectos hover de las tarjetas de estilos
  function handleSlideHoverEffects() {
    const estiloCards = document.querySelectorAll('.estilo-card');
    
    estiloCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('hovering');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('hovering');
      });
    });
  }