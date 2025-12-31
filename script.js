// ============================================
// ELEMENTOS DEL DOM
// ============================================

const openLetterBtn = document.getElementById('openLetterBtn');
const closeLetterBtn = document.getElementById('closeLetterBtn');
const toggleAlbumBtn = document.getElementById('toggleAlbumBtn');
const closeAlbumBtn = document.getElementById('closeAlbumBtn');
const letterSection = document.getElementById('letterSection');
const confettiContainer = document.getElementById('confettiContainer');
const photoAlbum = document.querySelector('.photo-album');
const bgMusic = document.getElementById('bgMusic');
const audioToggle = document.getElementById('audioToggle');

// Variable para evitar múltiples clics rápidos
let isAnimating = false;
let isAlbumOpen = false;

// ============================================
// REPRODUCTOR DE MÚSICA
// ============================================

/**
 * Intenta reproducir la música de fondo con volumen bajo
 */
function initAudio() {
    if (bgMusic) {
        bgMusic.volume = 0.3; // Volumen al 30%
        
        // Intentar reproducir automáticamente
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Reproducción exitosa
                audioToggle.textContent = '🔊';
                audioToggle.classList.remove('paused');
            }).catch((error) => {
                // Reproducción bloqueada por el navegador
                console.log('Reproducción automática bloqueada:', error);
                audioToggle.textContent = '🔇';
                audioToggle.classList.add('paused');
            });
        }
    }
}

/**
 * Alterna entre reproducir y pausar la música
 */
function toggleAudio() {
    if (bgMusic.paused) {
        bgMusic.play();
        audioToggle.textContent = '🔊';
        audioToggle.classList.remove('paused');
    } else {
        bgMusic.pause();
        audioToggle.textContent = '🔇';
        audioToggle.classList.add('paused');
    }
}

// Event listener para el botón de audio
if (audioToggle) {
    audioToggle.addEventListener('click', toggleAudio);
}

// Iniciar audio cuando la página cargue
window.addEventListener('load', initAudio);

// Intentar reproducir con cualquier interacción del usuario (importante para móviles)
const startAudioOnInteraction = () => {
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().then(() => {
            audioToggle.textContent = '🔊';
            audioToggle.classList.remove('paused');
        }).catch(() => {});
    }
};

// Múltiples eventos para asegurar que funcione en móviles
document.addEventListener('click', startAudioOnInteraction, { once: true });
document.addEventListener('touchstart', startAudioOnInteraction, { once: true });
document.addEventListener('touchend', startAudioOnInteraction, { once: true });

// También cuando se abre la carta
if (openLetterBtn) {
    openLetterBtn.addEventListener('click', startAudioOnInteraction, { once: true });
}
}, { once: true });

// ============================================
// CARGA DE FOTOS DEL ÁLBUM
// ============================================

/**
 * Carga las fotos de la carpeta images
 * Las posiciona de forma desordenada en la página
 */
function loadPhotoAlbum() {
    // Array de nombres de fotos que están en la carpeta /images/
    const photoNames = [
        'IMG_6531.JPG',
        'IMG_6528.JPG',
        'IMG_6526.JPG',
        'IMG_20250806_225719_739.webp',
        'IMG_20250804_183846_113.webp',
        'IMG_20250801_162548_897.webp',
        'IMG_20250730_013030.jpg',
        'IMG_20250726_142630.jpg',
        'IMG_20250725_174633.jpg',
        'IMG_20250723_113705.jpg',
        'IMG-20250803-WA0014.jpeg',
        'f5b28b00-bde8-44a1-93b3-29080802ec9c.jfif'
    ];
    
    // Dimensiones variadas para las fotos (efecto más natural)
    const sizes = [
        { width: 120, height: 150 },
        { width: 100, height: 140 },
        { width: 140, height: 120 },
        { width: 130, height: 170 },
        { width: 110, height: 135 },
        { width: 125, height: 155 },
        { width: 135, height: 125 },
        { width: 115, height: 145 },
        { width: 145, height: 115 },
        { width: 128, height: 160 },
        { width: 118, height: 148 },
        { width: 142, height: 118 }
    ];
    
    // Posiciones aleatorias para cada foto
    const positions = generateRandomPositions(photoNames.length);
    
    photoNames.forEach((photoName, index) => {
        setTimeout(() => {
            const frame = document.createElement('div');
            frame.classList.add('photo-frame');
            
            const size = sizes[index] || { width: 120, height: 150 };
            const pos = positions[index];
            const rotation = Math.random() * 8 - 4; // Rotación entre -4 y 4 grados
            
            // Estilos
            frame.style.width = size.width + 'px';
            frame.style.height = size.height + 'px';
            frame.style.left = pos.left + '%';
            frame.style.top = pos.top + '%';
            frame.style.transform = `rotate(${rotation}deg)`;
            frame.style.setProperty('--rotation', `${rotation}deg`);
            frame.style.animationDelay = (index * 0.1) + 's';
            frame.style.animation = `photoAppear 0.8s ease-out forwards, photoFloat 3s ease-in-out infinite`;
            frame.style.animationDelay = `${index * 0.1}s, ${index * 0.1}s`;
            
            const img = document.createElement('img');
            img.src = `images/${photoName}`;
            img.alt = `Foto recuerdo ${index + 1}`;
            img.onerror = () => {
                // Si la imagen no carga, mostrar un placeholder
                frame.style.background = 'linear-gradient(135deg, ' + getRandomPastelColor() + ' 0%, ' + getRandomPastelColor() + ' 100%)';
                frame.style.display = 'flex';
                frame.style.justifyContent = 'center';
                frame.style.alignItems = 'center';
                frame.textContent = '📷';
                frame.style.fontSize = '40px';
                frame.removeChild(img);
            };
            
            frame.appendChild(img);
            photoAlbum.appendChild(frame);
        }, index * 150); // Retraso escalonado entre fotos
    });
}

/**
 * Genera posiciones aleatorias para las fotos en los lados
 * Distribuye las fotos a izquierda y derecha
 */
function generateRandomPositions(count) {
    const positions = [];
    const half = Math.ceil(count / 2);
    
    // Primera mitad - lado IZQUIERDO (más centrado)
    for (let i = 0; i < half && i < count; i++) {
        const baseLeft = Math.random() * 35; // 0-35% (más distribuido)
        const baseTop = (i / half) * 80 + Math.random() * 15 - 7.5;
        
        positions.push({
            left: Math.max(0, Math.min(35, baseLeft)),
            top: Math.max(15, Math.min(85, baseTop))
        });
    }
    
    // Segunda mitad - lado DERECHO (más centrado)
    for (let i = half; i < count; i++) {
        const baseLeft = 65 + Math.random() * 35; // 65-100% (más distribuido)
        const baseTop = ((i - half) / (count - half)) * 80 + Math.random() * 15 - 7.5;
        
        positions.push({
            left: Math.max(65, Math.min(100, baseLeft)),
            top: Math.max(15, Math.min(85, baseTop))
        });
    }
    
    return positions;
}

/**
 * Genera un color pastel aleatorio
 */
function getRandomPastelColor() {
    const colors = [
        '#FFB6D9', '#D4A5FF', '#B4E7FF', '#FFFACD', '#FFE4F0', '#E0BBE4'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ============================================
// ÁLBUM MÓVIL (toggle)
// ============================================

function toggleMobileAlbum() {
    // Solo aplica para móviles/tablets pequeñas
    if (window.innerWidth > 768) return;

    isAlbumOpen = !isAlbumOpen;

    if (isAlbumOpen) {
        photoAlbum.classList.add('mobile-visible');
        document.body.style.overflow = 'hidden';
        if (toggleAlbumBtn) toggleAlbumBtn.textContent = 'Cerrar álbum 📕';
    } else {
        photoAlbum.classList.remove('mobile-visible');
        if (!letterSection.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
        if (toggleAlbumBtn) toggleAlbumBtn.textContent = 'Ver álbum 📸';
    }
}

// ============================================
// FUNCIONES DE ANIMACIÓN
// ============================================

/**
 * Abre la carta con animación
 */
function openLetter() {
    if (isAnimating) return; // Prevenir múltiples clics
    isAnimating = true;
    
    letterSection.classList.add('active');
    createConfetti();
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

/**
 * Cierra la carta con animación
 */
function closeLetter() {
    if (isAnimating) return; // Prevenir múltiples clics
    isAnimating = true;
    
    letterSection.classList.remove('active');
    
    // Restaurar scroll del body
    document.body.style.overflow = photoAlbum.classList.contains('mobile-visible') ? 'hidden' : 'auto';
    
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

/**
 * Crea y anima confeti cayendo
 * Simula una lluvia de celebración
 * Optimizado para móviles
 */
function createConfetti() {
    // Detectar si es móvil para ajustar cantidad
    const isMobile = window.innerWidth < 768;
    
    // Colores para el confeti (dorado estilo Orgullo y Prejuicio)
    const colors = ['#D4AF37', '#8B4F5C', '#6B5B4A'];
    
    // Crear menos confeti en móviles para mejor rendimiento
    const confettiCount = isMobile ? 
        Math.random() * 15 + 20 :  // 20-35 en móvil
        Math.random() * 20 + 30;   // 30-50 en desktop
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Posición horizontal aleatoria
        const randomLeft = Math.random() * 100;
        confetti.style.left = randomLeft + '%';
        
        // Color aleatorio
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = randomColor;
        
        // Tamaño aleatorio (más pequeño en móvil)
        const randomSize = isMobile ?
            Math.random() * 6 + 3 :      // 3-9px en móvil
            Math.random() * 8 + 5;       // 5-13px en desktop
        confetti.style.width = randomSize + 'px';
        confetti.style.height = randomSize + 'px';
        
        // Duración aleatoria de animación
        const duration = Math.random() * 2 + 2.5;
        confetti.style.animationDuration = duration + 's';
        
        // Retraso aleatorio
        const delay = Math.random() * 0.3;
        confetti.style.animationDelay = delay + 's';
        
        // Agregar al contenedor
        confettiContainer.appendChild(confetti);
        
        // Remover después de que termine la animación
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

/**
 * Crea confeti suave de bienvenida
 * Se ejecuta al cargar la página
 */
function createWelcomeConfetti() {
    const isMobile = window.innerWidth < 768;
    const colors = ['#D4AF37', '#8B4F5C'];
    const initialConfetti = isMobile ? 5 : 10;
    
    for (let i = 0; i < initialConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const randomLeft = Math.random() * 100;
        confetti.style.left = randomLeft + '%';
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = randomColor;
        
        const randomSize = isMobile ?
            Math.random() * 4 + 2 :
            Math.random() * 6 + 4;
        confetti.style.width = randomSize + 'px';
        confetti.style.height = randomSize + 'px';
        
        const duration = Math.random() * 3 + 3;
        confetti.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 0.5;
        confetti.style.animationDelay = delay + 's';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Abrir carta al hacer clic en el botón
openLetterBtn.addEventListener('click', openLetter, { passive: true });

// Cerrar carta al hacer clic en el botón cerrar
closeLetterBtn.addEventListener('click', closeLetter, { passive: true });

// Cerrar carta al hacer clic fuera de ella (en el overlay)
letterSection.addEventListener('click', function(event) {
    // Solo cerrar si se hace clic en el fondo, no en la tarjeta
    if (event.target === letterSection) {
        closeLetter();
    }
}, { passive: true });

// Mostrar álbum en móviles
if (toggleAlbumBtn) {
    toggleAlbumBtn.addEventListener('click', toggleMobileAlbum, { passive: true });
}
    
    if (closeAlbumBtn) {
        closeAlbumBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            if (isAlbumOpen) toggleMobileAlbum();
        }, { passive: true });
    }

// Cerrar álbum móvil al tocar el fondo oscuro
photoAlbum.addEventListener('click', function(event) {
    if (photoAlbum.classList.contains('mobile-visible') && event.target === photoAlbum) {
        toggleMobileAlbum();
    }
}, { passive: true });

// Cerrar carta con touch en bordes (mejora UX móvil)
letterSection.addEventListener('touchstart', function(event) {
    const touch = event.touches[0];
    const rect = letterSection.getBoundingClientRect();
    
    // Si el toque es en las esquinas, cerrar
    const margin = 30;
    if (touch.clientX < margin || 
        touch.clientX > window.innerWidth - margin ||
        touch.clientY < margin ||
        touch.clientY > window.innerHeight - margin) {
        closeLetter();
    }
}, { passive: true });

// ============================================
// ANIMACIÓN DE ENTRADA AL CARGAR LA PÁGINA
// ============================================

/**
 * Ejecuta animaciones al cargar la página
 */
window.addEventListener('load', function() {
    // Esperar un poco para que la página esté completamente cargada
    setTimeout(() => {
        // Cargar el álbum de fotos
        loadPhotoAlbum();
        
        // Crear confeti de bienvenida
        createWelcomeConfetti();
    }, 300);
}, { passive: true });

// ============================================
// FUNCIONALIDAD ADICIONAL (Opcional)
// ============================================

/**
 * Agregar efecto de tecla ESC para cerrar la carta
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && letterSection.classList.contains('active')) {
        closeLetter();
    }
});

/**
 * Optimización para evitar layout thrashing
 * Reduce re-renders innecesarios
 */
window.addEventListener('resize', function() {
    // Throttling simple para eventos de resize
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function() {
        // Si pasamos a desktop, cerrar overlay del álbum móvil
        if (window.innerWidth > 768 && isAlbumOpen) {
            photoAlbum.classList.remove('mobile-visible');
            isAlbumOpen = false;
            if (!letterSection.classList.contains('active')) {
                document.body.style.overflow = 'auto';
            }
            if (toggleAlbumBtn) toggleAlbumBtn.textContent = 'Ver álbum 📸';
        }
    }, 250);
}, { passive: true });

/**
 * Soporte para notch y safe areas en iPhone
 */
if (navigator.standalone === true) {
    document.body.style.paddingTop = 'max(0px, env(safe-area-inset-top))';
    document.body.style.paddingBottom = 'max(0px, env(safe-area-inset-bottom))';
}

/**
 * Log en consola para confirmar que el script está cargado
 */
console.log('🎆 ¡Página de Año Nuevo cargada! Hecha con amor para Mary 💖');
