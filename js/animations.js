document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimation();
    initButtonHoverEffects();
    createConfetti();
  });
  
  // Animaciones de la sección hero
  function initHeroAnimation() {
    const heroText = document.querySelector('#hero .hero-text');
    const heroImage = document.querySelector('#hero .hero-image');
    
    // Agregar un ligero retraso antes de iniciar las animaciones
    setTimeout(() => {
      if (heroText) heroText.classList.add('active');
      
      setTimeout(() => {
        if (heroImage) heroImage.classList.add('active');
      }, 300);
    }, 300);
  }
  
  // Efectos de hover en botones
  function initButtonHoverEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        // Crear un efecto de ondulación
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        this.appendChild(ripple);
        
        // Eliminar la ondulación después de que se complete la animación
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
  
  // Crear animación de confeti para el modal de éxito
  function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    
    if (!confettiContainer) return;
    
    const colors = [
      '#7c3aed', // primario
      '#ec4899', // acento
      '#f59e0b', // festivo
      '#ffffff'  // blanco
    ];
    
    // Crear 50 piezas de confeti
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');
      
      // Estilo aleatorio de confeti
      const size = Math.random() * 10 + 5; // 5-15px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.background = color;
      
      // Posición aleatoria
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 100}%`;
      
      // Animación
      confetti.style.animationDuration = `${Math.random() * 2 + 1}s`; // 1-3s
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      
      // Agregar al contenedor
      confettiContainer.appendChild(confetti);
    }
  }
  
  // Agregar CSS para elementos dinámicos
  const style = document.createElement('style');
  style.textContent = `
    .btn-ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
      animation: ripple 0.6s ease-out;
      z-index: 0;
    }
    
    @keyframes ripple {
      0% {
        width: 0;
        height: 0;
        opacity: 0.5;
      }
      100% {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
    
    .confetti-piece {
      position: absolute;
      border-radius: 3px;
      animation: confetti-fall forwards;
      transform: rotate(0);
    }
    
    @keyframes confetti-fall {
      0% {
        transform: translateY(-50px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(150px) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);