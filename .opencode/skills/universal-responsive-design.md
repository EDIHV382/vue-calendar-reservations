# Skill: Universal Responsive Design

Diseño profesional, atractivo y responsivo para cualquier tipo de proyecto web.

## Principios Fundamentales

### 1. Mobile-First
- Diseñar primero para móvil (≤600px)
- Escalar progresivamente a tablet y desktop
- Usar breakpoints de Vuetify: `cols`, `sm`, `md`, `lg`, `xl`

### 2. Jerarquía Visual
- Títulos claros con pesos diferenciados (700-800)
- Texto secundario en `text-medium-emphasis`
- Spacing consistente (múltiplos de 4px)

### 3. Profundidad y Dimensión
- Sombras suaves para elevación
- Gradientes sutiles para fondos
- Hover effects con transform + shadow

### 4. Consistencia
- Mismos border-radius en componentes similares
- Palette de colores coherente
- Tipografía unificada

---

## Sistema de Layout

### Container Responsivo
```vue
<v-container style="max-width: 1200px;" class="py-6 py-sm-8 py-md-12">
  <!-- Contenido -->
</v-container>
```

### Grid System
```vue
<v-row>
  <v-col cols="12" sm="6" md="4">
    <!-- Columna responsive -->
  </v-col>
</v-row>
```

**Breakpoints:**
- `cols="12"` → Mobile: 100% ancho
- `sm="6"` → Tablet: 50% ancho
- `md="4"` → Desktop: 33% ancho

### Min-Height para Vistas
```css
.view-name {
  min-height: calc(100vh - 70px); /* 70px = altura del app-bar */
  padding-top: 40px;
  padding-bottom: 40px;
}
```

---

## Componentes Base

### Card Universal
```vue
<v-card
  class="glass-card"
  elevation="0"
  rounded="xl"
>
  <v-card-text class="pa-5">
    <!-- Contenido -->
  </v-card-text>
</v-card>
```

**Estilos glassmorphism:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  border-color: rgba(var(--v-theme-primary), 0.3) !important;
}
```

### Icon Wrapper con Gradiente
```vue
<div class="icon-wrapper" :style="{ '--icon-color': color }">
  <v-icon :icon="iconName" color="white" size="28" />
</div>
```

**Estilos:**
```css
.icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    var(--icon-color) 0%,
    color-mix(in srgb, var(--icon-color) 70%, #26C6DA 30%) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px color-mix(in srgb, var(--icon-color) 35%, transparent 65%);
  transition: all 0.3s ease;
}

.card:hover .icon-wrapper {
  transform: scale(1.08);
}
```

### Botones
```vue
<!-- Primary Action -->
<v-btn
  color="primary"
  variant="flat"
  rounded="lg"
  size="large"
>
  Primary Action
</v-btn>

<!-- Secondary Action -->
<v-btn
  color="primary"
  variant="outlined"
  rounded="lg"
>
  Secondary Action
</v-btn>
```

**Estilos personalizados:**
```css
.v-btn {
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-weight: 600 !important;
}

/* Primary con gradiente (opcional) */
.primary-gradient {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%) !important;
  box-shadow: 0 6px 20px rgba(92, 107, 192, 0.4) !important;
  transition: all 0.3s ease !important;
}

.primary-gradient:hover {
  box-shadow: 0 10px 28px rgba(92, 107, 192, 0.5) !important;
  transform: translateY(-2px);
}
```

### Chips / Badges
```vue
<v-chip
  size="small"
  color="success"
  variant="flat"
  class="font-weight-medium"
>
  Disponible
</v-chip>
```

---

## Tipografía

### Jerarquía
```vue
<!-- Títulos de sección -->
<h2 class="section-title">Título Principal</h2>
<p class="section-subtitle">Subtítulo descriptivo</p>

<!-- Títulos de cards -->
<h3 class="text-h6 font-weight-bold">Título Card</h3>

<!-- Texto body -->
<p class="text-body-1 text-medium-emphasis">Texto secundario</p>

<!-- Texto pequeño -->
<p class="text-caption">Texto de ayuda</p>
```

**Estilos:**
```css
.section-title {
  font-size: clamp(1.5rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #1a1f5e;
  letter-spacing: -0.5px;
  line-height: 1.25;
}

.section-subtitle {
  font-size: 1rem;
  color: #6b7280;
}

.gradient-text {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Spacing System

### Padding Responsive
```vue
<!-- Padding vertical escalable -->
<div class="py-6 py-sm-8 py-md-12">
  <!-- Contenido -->
</div>

<!-- Padding horizontal con container -->
<v-container class="px-3 px-sm-4">
  <!-- Contenido -->
</v-container>
```

### Gap entre elementos
```vue
<div class="d-flex ga-2">
  <!-- Elementos con 8px gap -->
</div>

<div class="d-flex ga-3">
  <!-- Elementos con 12px gap -->
</div>
```

---

## Variables CSS Personalizables

```css
:root {
  /* Colores del tema (personalizar por proyecto) */
  --primary-color: #5C6BC0;
  --secondary-color: #26C6DA;
  --accent-color: #FF7043;
  
  /* Gradientes */
  --gradient-start: #5C6BC0;
  --gradient-end: #26C6DA;
  
  /* Bordes y sombras */
  --card-border: rgba(92, 107, 192, 0.15);
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.16);
  
  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

---

## Patrones Comunes

### Header de Sección
```vue
<div class="section-header text-center mb-10">
  <div class="section-tag mb-3">Etiqueta</div>
  <h2 class="section-title">
    Título con <span class="gradient-text">énfasis</span>
  </h2>
  <p class="section-subtitle">Subtítulo descriptivo</p>
</div>
```

### Section Tag (Badge de sección)
```css
.section-tag {
  display: inline-block;
  background: rgba(92, 107, 192, 0.1);
  color: #5C6BC0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 100px;
  border: 1px solid rgba(92, 107, 192, 0.2);
}
```

### Lista de Items con Iconos
```vue
<div class="d-flex align-center mb-3">
  <div class="icon-box mr-3">
    <v-icon size="16" color="primary">mdi-check</v-icon>
  </div>
  <div>
    <p class="text-body-2 font-weight-medium">Título</p>
    <p class="text-caption text-medium-emphasis">Descripción</p>
  </div>
</div>
```

---

## Animaciones y Transiciones

### Hover Effects
```css
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
}
```

### Fade In (entrada de página)
```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
```

### Animación de Icono
```css
.icon-wrapper {
  transition: transform 0.3s ease;
}

.card:hover .icon-wrapper {
  transform: scale(1.08);
}
```

---

## Ejemplo de Implementación Completa

```vue
<template>
  <div class="my-view">
    <v-container style="max-width: 1200px;" class="py-6 py-sm-8 py-md-12">
      <!-- Header -->
      <div class="section-header text-center mb-10">
        <div class="section-tag mb-3">Categoría</div>
        <h2 class="section-title">
          Título <span class="gradient-text">Principal</span>
        </h2>
        <p class="section-subtitle">Descripción del contenido</p>
      </div>

      <!-- Grid de Cards -->
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="glass-card" elevation="0" rounded="xl">
            <v-card-text class="pa-5">
              <div class="icon-wrapper mb-4" :style="{ '--icon-color': item.color }">
                <v-icon :icon="item.icon" color="white" size="28" />
              </div>
              <h3 class="text-h6 font-weight-bold mb-2">{{ item.title }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-4">{{ item.description }}</p>
              <v-btn block color="primary" variant="flat" rounded="lg">
                Acción
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.my-view {
  min-height: calc(100vh - 70px);
  padding-top: 40px;
  padding-bottom: 40px;
}

/* Incluir aquí los estilos de glass-card, icon-wrapper, section-header, etc. */
</style>
```

---

## Checklist de Implementación

- [ ] Container con `max-width: 1200px`
- [ ] Padding responsive (`py-6 py-sm-8 py-md-12`)
- [ ] Grid system con breakpoints
- [ ] Cards con glassmorphism (opcional)
- [ ] Iconos con wrapper gradient
- [ ] Botones con `rounded="lg"` y `variant="flat"`
- [ ] Tipografía con jerarquía clara
- [ ] Hover effects en cards
- [ ] Spacing consistente (ga-2, ga-3)
- [ ] Min-height para vista completa

---

## Notas Finales

- **Adaptable**: Cambia los colores en `vuetify.js` para diferentes temas
- **Performance**: Usa `will-change: transform` en animaciones complejas
- **Accesibilidad**: Mantén contraste mínimo de 4.5:1 para texto
- **Responsive**: Testea en 320px, 768px, 1024px, 1440px
