# 📸 Página Romántica de Año Nuevo para Mary

Una página web elegante estilo "Orgullo y Prejuicio" con un álbum de fotos desordenado y una carta de amor.

## 📁 Estructura del Proyecto

```
newyear/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── images/             # Carpeta para tus fotos
│   ├── foto1.jpg
│   ├── foto2.jpg
│   ├── foto3.jpg
│   └── ...
└── README.md          # Este archivo
```

## 🎨 Cómo Agregar Tus Fotos

1. **Crea tus archivos de imagen** en la carpeta `images/`
2. **Nombra las fotos** como: `foto1.jpg`, `foto2.jpg`, `foto3.jpg`, etc.
3. **Formatos soportados**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### Ejemplo:
```
images/
├── foto1.jpg  (Foto de ustedes dos)
├── foto2.jpg  (Un momento especial)
├── foto3.jpg  (Viaje juntos)
├── foto4.jpg  (Foto divertida)
├── foto5.jpg  (Momento romántico)
├── foto6.jpg  (En familia)
├── foto7.jpg  (Naturaleza juntos)
├── foto8.jpg  (Selfie)
└── foto9.jpg  (Su foto favorita)
```

## ✨ Características

- 🎭 Diseño tipo "Orgullo y Prejuicio" (elegante y clásico)
- 📸 Álbum de fotos desordenado con efecto vintage
- 💌 Carta de amor interactiva
- ✨ Animaciones suaves y confeti dorado
- 📱 Totalmente responsive (funciona en todos los celulares)
- 🎆 Confeti animado al abrir la carta
- 💖 Texto justificado y elegante

## 🚀 Cómo Usar

1. **Abre** `index.html` en tu navegador
2. **Las fotos aparecerán** de forma desordenada en la parte superior
3. **Haz clic** en "Ábreme 💌" para ver la carta
4. **Confeti mágico** aparecerá al abrir

## 📝 Personalizaciones

### Cambiar la cantidad de fotos
En `script.js`, busca la línea `const photoNames = [...]` y agrega o quita elementos:

```javascript
const photoNames = [
    'foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg',
    'foto6.jpg', 'foto7.jpg', 'foto8.jpg', 'foto9.jpg', 'foto10.jpg'  // ← Agrega foto10.jpg
];
```

### Cambiar los tamaños de las fotos
Modifica el array `sizes` en `script.js`:

```javascript
const sizes = [
    { width: 150, height: 180 },  // Más grande
    { width: 100, height: 140 },  // Más pequeño
    // ... más tamaños
];
```

### Editar la carta
En `index.html`, busca la sección `<div class="letter-content">` y modifica el texto.

## 🎨 Colores del Tema

- **Burdeos Elegante**: `#8B4F5C`
- **Dorado Clásico**: `#D4AF37`
- **Crema Antiguo**: `#F5F1E8`
- **Marrón Aristocrático**: `#6B5B4A`

## 🖼️ Consejos para las Fotos

✅ **Usa fotos de buena calidad**
✅ **Proporciones variadas** (vertical, horizontal, cuadrado)
✅ **Tamaño recomendado**: 800x600px o más
✅ **Formato**: JPG o PNG (optimizado)
✅ **Momento especial**: Fotos que les representen como pareja

## 💻 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (versiones recientes)
- ✅ Móviles iOS y Android
- ✅ Tablets
- ✅ Desktop

## 🎁 Efectos Especiales

### Álbum de Fotos
- 📐 Rotación aleatoria (-4 a +4 grados)
- 📍 Posiciones desordenadas
- ✨ Aparecen gradualmente con animación
- 🎨 Efecto flotante suave

### Carta de Amor
- 💌 Texto justificado y elegante
- 🌸 Decoraciones de pétalos
- ✨ Confeti al abrir
- 🖤 Bordes dorados elegantes

## 📱 Vista Responsiva

La página se adapta automáticamente a:
- Teléfonos pequeños (320px)
- Teléfonos medianos (480px)
- Teléfonos grandes (600px)
- Tablets (768px)
- Desktop (1024px+)

## 💝 Mensaje Final

Esta página fue hecha con amor para Mary 💖
¡Que disfrute su Año Nuevo especial!

---

**Hecho con ❤️ para un Año Nuevo lleno de amor**
