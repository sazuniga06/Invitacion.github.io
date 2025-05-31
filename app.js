
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const letters = '01'.split('');
  const fontSize = 12;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#00ffea';
    ctx.font = fontSize + 'px Orbitron';
    ctx.shadowColor = '#00ffe1';
    ctx.shadowBlur = 15;

    for(let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if(drops[i] * fontSize > height && Math.random() > 0.97) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);

  // Partículas de brillo
  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 5 + 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.animationDuration = (2 + Math.random() * 3) + 's';
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 5000);
  }

  setInterval(createParticle, 350);

  // Mostrar la carta y ocultar botón
  const openBtn = document.getElementById('open-btn');
  const letterContainer = document.getElementById('letter-container');

  openBtn.addEventListener('click', () => {
    letterContainer.style.display = 'block';
    openBtn.style.display = 'none';
  });

  // Ecuaciones flotantes MathJax

const equationsText = [
  '\\( E=mc^2 \\)',
  '\\( F=ma \\)',
  '\\( V = \\int_{a}^{b} A(x)\\,dx \\)',
  '\\( P=IV \\)',
  '\\( \\Delta x = v_0 t + \\frac{1}{2}at^2 \\)',
  '\\( \\vec{F}=q(\\vec{E} + \\vec{v} \\times \\vec{B}) \\)',
  '\\( \\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\varepsilon_0} \\)',
  '\\( \\nabla \\cdot \\vec{B} = 0 \\)',
  '\\( \\psi(x,t) = A e^{i(kx - \\omega t)} \\)',
  '\\( \\sum F = 0 \\)',
  '\\( \\lambda = \\frac{h}{p} \\)',
  '\\( E = hf \\)',
  '\\( \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{int}}{\\varepsilon_0} \\)',
  '\\( \\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I \\)',
  '\\( \\Delta S \\geq 0 \\)',
  '\\( Q = mc\\Delta T \\)',
  '\\( \\frac{1}{2}mv^2 \\)',
  '\\( I = \\int r^2\\,dm \\)'
];

function createFloatingEquation() {
  const eq = document.createElement('div');
  eq.classList.add('floating-math');

  // Posición inicial aleatoria (de izquierda a derecha)
  eq.style.left = (Math.random() * 85 + 5) + 'vw'; // margen 5-90vw
  eq.style.bottom = '-40px'; // inicia justo debajo de la pantalla

  // Estilo aleatorio
  eq.style.fontSize = (22 + Math.random() * 18) + 'px';
  eq.style.animationDuration = (20 + Math.random() * 10) + 's';
  eq.style.animationTimingFunction = 'linear';
  eq.style.opacity = '0';
  eq.style.transform = `rotate(${Math.random() * 360}deg)`;

  // Escoge ecuación aleatoria
  const text = equationsText[Math.floor(Math.random() * equationsText.length)];
  eq.innerHTML = text;

  document.body.appendChild(eq);

  // Renderiza con MathJax
  MathJax.typesetPromise([eq]).then(() => {
    eq.style.opacity = '1';
    eq.style.animationName = 'floatUpFade'; // debe estar definido en tu CSS
  });

  // Remueve después de la animación
  setTimeout(() => {
    eq.remove();
  }, 35000); // más que duración máxima
}

// Ejecutar cada cierto tiempo
setInterval(createFloatingEquation, 800); // frecuencia ajustada

// Nueva animación floatUpFade
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUpFade {
    0% {
      transform: translateY(0);
      opacity: 1;
      filter: drop-shadow(0 0 10px #ff00ff);
    }
    80% {
      opacity: 1;
      filter: drop-shadow(0 0 25px #ff00ff);
    }
    100% {
      transform: translateY(-110vh);
      opacity: 0;
      filter: drop-shadow(0 0 5px #ff00ff);
    }
  }
`;
document.head.appendChild(style);
