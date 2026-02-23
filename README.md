# 🎓 Educa Digital Landing Page

![Educa Digital](https://img.shields.io/badge/EdTech-Colombia-6366f1)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Landing page profesional para **Educa Digital**, empresa colombiana especializada en desarrollo de aplicaciones educativas, soluciones EdTech y plataformas LMS.

## 📋 Descripción

Educa Digital es una plataforma integral que ofrece:
- 🎯 Desarrollo de aplicaciones y software educativo
- 💼 Capacitación empresarial personalizada
- 🌐 Desarrollo web y aplicaciones a medida
- 📚 Implementación de plataformas LMS (Moodle y más)
- 🚀 Soluciones EdTech innovadoras

## ✨ Características

- **Diseño Responsive**: Optimizado para todo tipo de dispositivos
- **UI/UX Moderno**: Interfaz atractiva con animaciones suaves
- **SEO Optimizado**: Metadatos completos para mejor posicionamiento
- **Performance**: Carga rápida y optimizada
- **Formulario de Contacto**: Integrado con Formspree
- **WhatsApp Directo**: Acceso rápido a asesores comerciales
- **Componentes Interactivos**: Tarjetas, carruseles y efectos visuales

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con Flexbox y Grid
- **JavaScript Vanilla**: Interactividad sin frameworks
- **Phosphor Icons**: Iconografía moderna
- **Formspree**: Gestión de formularios

## 📱 Páginas

1. **Home** (`index.html`) - Página principal con hero section y servicios destacados
2. **Nosotros** (`company.html`) - Información de la empresa
3. **Servicios** (`services.html`) - Catálogo completo de servicios EdTech
4. **Cursos** (`blog.html`) - Oferta de capacitación y cursos
5. **Precios** (`pricing.html`) - Planes y cotizaciones
6. **Contacto** (`contact.html`) - Formulario y contacto directo por WhatsApp

## 📂 Estructura del Proyecto

```
Educa-Digital-Landing/
├── index.html              # Página principal
├── company.html            # Sobre nosotros
├── services.html           # Servicios
├── blog.html              # Cursos
├── pricing.html           # Precios
├── contact.html           # Contacto
├── vercel.json            # Configuración Vercel
├── .vercelignore          # Archivos ignorados en deployment
├── css/
│   ├── main.css           # Estilos globales
│   ├── navbar.css         # Navegación
│   ├── footer.css         # Pie de página
│   ├── index.css          # Home
│   ├── company.css        # Nosotros
│   ├── services.css       # Servicios
│   ├── blog.css           # Cursos
│   ├── pricing.css        # Precios
│   ├── contact.css        # Contacto
│   ├── contact-form.css   # Formulario y WhatsApp
│   ├── contact-carousel.css
│   └── responsive.css     # Media queries
├── js/
│   ├── hero-background.js
│   ├── formation-cards.js
│   ├── contact-carousel.js
│   └── contact-form.js
└── assets/
    └── [imágenes y recursos]
```

## 🚀 Deployment en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. **Push al repositorio:**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin master
   ```

2. **Conectar con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa el repositorio: `Felipelondonoliquid33/Educa-Digital-Landing`
   - Vercel detectará automáticamente la configuración
   - Click en "Deploy"

3. **Configuración Automática:**
   - Framework Preset: Other
   - Build Command: (vacío)
   - Output Directory: ./
   - Install Command: (vacío)

### Opción 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 💻 Desarrollo Local

### Prerequisitos
- Navegador web moderno
- Editor de código (VS Code recomendado)
- Live Server (extensión de VS Code)

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Felipelondonoliquid33/Educa-Digital-Landing.git
   cd Educa-Digital-Landing
   ```

2. **Abrir con Live Server:**
   - Abrir el proyecto en VS Code
   - Instalar extensión "Live Server"
   - Click derecho en `index.html` → "Open with Live Server"
   - O usar el botón "Go Live" en la barra inferior

3. **Acceder:**
   ```
   http://localhost:5500
   ```

## 📧 Configuración del Formulario

El formulario de contacto usa **Formspree**. Para cambiar el destino:

1. Ir a [formspree.io](https://formspree.io)
2. Crear o acceder a tu cuenta
3. Obtener tu endpoint ID
4. Actualizar en `contact.html` y `contact-form.js`:
   ```html
   <!-- contact.html línea 138 -->
   <form action="https://formspree.io/f/TU_ENDPOINT" method="POST">
   ```
   ```javascript
   // contact-form.js línea 54
   fetch('https://formspree.io/f/TU_ENDPOINT', {
   ```

## 📞 Contacto WhatsApp

Para actualizar los números de WhatsApp, editar en `contact.html`:

```html
<!-- Línea aproximada 213 -->
<a href="https://wa.me/57TUNUMERO" target="_blank" class="whatsapp-card">
```

## 🎨 Personalización

### Colores Principales
```css
/* css/main.css */
:root {
  --primary: #6366f1;    /* Índigo */
  --secondary: #8b5cf6;  /* Púrpura */
  --accent: #22c55e;     /* Verde WhatsApp */
}
```

### Fuentes
El proyecto usa la fuente del sistema por defecto. Para cambiar:
```css
body {
  font-family: 'Tu Fuente', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

## 📊 SEO y Performance

- ✅ Metadatos completos en todas las páginas
- ✅ Open Graph tags para redes sociales
- ✅ Imágenes optimizadas
- ✅ Cache headers configurados
- ✅ Clean URLs habilitadas
- ✅ Mobile-first responsive design

## 🔒 Seguridad

Headers de seguridad configurados en `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

## 📝 Licencia

Este proyecto es propiedad de **Educa Digital**. Todos los derechos reservados.

## 👨‍💻 Desarrollo

**Desarrollador:** Felipe Londoño Humar  
**Email:** londonof@gmail.com  
**Empresa:** Educa Digital  
**Ubicación:** Colombia

## 🤝 Contribución

Este es un proyecto privado de Educa Digital. Para cambios o mejoras, contactar directamente a:
- Email: londonof@gmail.com
- WhatsApp: +57 311 270 4276

## 🌐 Links

- **GitHub Repository:** [Educa-Digital-Landing](https://github.com/Felipelondonoliquid33/Educa-Digital-Landing)
- **Production Site:** [Configurar después del deploy]

## 📈 Próximas Mejoras

- [ ] Implementar Google Analytics
- [ ] Agregar blog dinámico
- [ ] Sistema de gestión de contenido
- [ ] Integración con CRM
- [ ] Panel de administración
- [ ] Certificados digitales automáticos

## 🐛 Reporte de Bugs

Para reportar bugs o solicitar features, contactar a:
- Felipe Londoño: londonof@gmail.com

---

**Desarrollado con ❤️ por Felipe Londoño Humar para Educa Digital**

© 2026 Educa Digital - Todos los derechos reservados
