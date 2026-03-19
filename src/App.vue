<template>
  <v-app class="app-root">
    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawerOpen"
      temporary
      location="right"
      width="280"
      class="mobile-drawer"
    >
      <div class="drawer-header pa-6">
        <div class="d-flex align-center mb-2">
          <div class="logo-icon-wrapper mr-3">
            <v-icon icon="mdi-heart-pulse" color="white" size="22" />
          </div>
          <span class="logo-text">MediBook<span class="logo-dot">.</span></span>
        </div>
        <p class="drawer-tagline mb-0">Tu salud, nuestra prioridad</p>
      </div>

      <v-divider class="drawer-divider" />

      <v-list class="pa-3 pt-4">
        <v-list-item
          to="/"
          rounded="xl"
          class="drawer-item mb-2 px-4"
          @click="drawerOpen = false"
        >
          <template #prepend>
            <v-icon size="18" class="mr-2">mdi-home-outline</v-icon>
          </template>
          <v-list-item-title class="drawer-item-title">Inicio</v-list-item-title>
        </v-list-item>

        <v-list-item
          to="/doctors"
          rounded="xl"
          class="drawer-item mb-2 px-4"
          @click="drawerOpen = false"
        >
          <template #prepend>
            <v-icon size="18" class="mr-2">mdi-doctor</v-icon>
          </template>
          <v-list-item-title class="drawer-item-title">Especialistas</v-list-item-title>
        </v-list-item>

        <v-list-item
          to="/services"
          rounded="xl"
          class="drawer-item mb-2 px-4"
          @click="drawerOpen = false"
        >
          <template #prepend>
            <v-icon size="18" class="mr-2">mdi-medical-bag</v-icon>
          </template>
          <v-list-item-title class="drawer-item-title">Servicios</v-list-item-title>
        </v-list-item>
      </v-list>

      <div class="pa-4 pt-2">
        <v-btn
          to="/booking"
          block
          class="book-btn"
          size="large"
          rounded="xl"
          @click="drawerOpen = false"
        >
          <v-icon start size="18">mdi-calendar-plus</v-icon>
          Agendar cita
        </v-btn>
      </div>

      <div class="drawer-footer pa-4 pt-2">
        <div class="d-flex justify-center ga-3">
          <div class="contact-chip">
            <v-icon size="13" class="mr-1">mdi-phone</v-icon>
            <span>+52 800 123 4567</span>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Premium Navigation Bar -->
    <v-app-bar
      height="68"
      elevation="0"
      class="nav-bar"
      :class="{ 'nav-scrolled': scrolled }"
    >
      <v-container class="d-flex align-center py-0 px-4 px-md-6" style="max-width: 1280px;">

        <!-- Logo -->
        <div class="nav-logo d-flex align-center" @click="$router.push('/')" style="cursor:pointer;">
          <div class="logo-icon-wrapper mr-2">
            <v-icon icon="mdi-heart-pulse" color="white" size="20" />
          </div>
          <span class="logo-text">MediBook<span class="logo-dot">.</span></span>
        </div>

        <v-spacer />

        <!-- Desktop Nav Links -->
        <nav class="d-none d-md-flex align-center ga-1">
          <v-btn
            to="/"
            variant="text"
            rounded="lg"
            class="nav-link-btn"
            size="small"
          >
            <v-icon start size="15">mdi-home-outline</v-icon>
            Inicio
          </v-btn>

          <v-btn
            to="/doctors"
            variant="text"
            rounded="lg"
            class="nav-link-btn"
            size="small"
          >
            <v-icon start size="15">mdi-doctor</v-icon>
            Especialistas
          </v-btn>

          <v-btn
            to="/services"
            variant="text"
            rounded="lg"
            class="nav-link-btn"
            size="small"
          >
            <v-icon start size="15">mdi-medical-bag</v-icon>
            Servicios
          </v-btn>

          <div class="nav-divider mx-2" />

          <v-btn
            to="/booking"
            class="book-btn ml-1"
            size="small"
            rounded="lg"
            elevation="0"
          >
            <v-icon start size="15">mdi-calendar-plus</v-icon>
            Agendar cita
          </v-btn>
        </nav>

        <!-- Tablet: show only booking button -->
        <div class="d-none d-sm-flex d-md-none align-center ga-2">
          <v-btn
            to="/booking"
            class="book-btn"
            size="small"
            rounded="lg"
            elevation="0"
          >
            <v-icon start size="15">mdi-calendar-plus</v-icon>
            Agendar
          </v-btn>

          <v-btn
            icon
            variant="text"
            class="hamburger-btn"
            @click="drawerOpen = !drawerOpen"
            aria-label="Menú"
          >
            <v-icon size="21" color="#5C6BC0">{{ drawerOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </v-btn>
        </div>

        <!-- Mobile hamburger only -->
        <v-btn
          icon
          variant="text"
          class="d-flex d-sm-none hamburger-btn"
          @click="drawerOpen = !drawerOpen"
          aria-label="Menú"
        >
          <v-icon size="21" color="#5C6BC0">{{ drawerOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn>

      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="main-content">
      <Transition name="page" mode="out-in">
        <RouterView />
      </Transition>
    </v-main>

    <!-- Footer -->
    <footer class="app-footer">
      <v-container style="max-width: 1280px;" class="px-4 px-md-6">

        <!-- Footer top grid -->
        <div class="footer-grid py-8 py-md-10">

          <!-- Brand column -->
          <div class="footer-brand-col">
            <div class="d-flex align-center ga-2 mb-3">
              <div class="logo-icon-wrapper">
                <v-icon icon="mdi-heart-pulse" color="white" size="20" />
              </div>
              <span class="logo-text">MediBook<span class="logo-dot">.</span></span>
            </div>
            <p class="footer-desc">
              Conectamos pacientes con los mejores especialistas médicos de forma rápida, segura y eficiente.
            </p>
            <div class="d-flex ga-2 mt-4">
              <v-btn icon size="small" variant="tonal" color="primary" class="footer-social-btn" rounded="lg">
                <v-icon size="16">mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon size="small" variant="tonal" color="primary" class="footer-social-btn" rounded="lg">
                <v-icon size="16">mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon size="small" variant="tonal" color="primary" class="footer-social-btn" rounded="lg">
                <v-icon size="16">mdi-instagram</v-icon>
              </v-btn>
            </div>
          </div>

          <!-- Links columns -->
          <div class="footer-links-col">
            <p class="footer-col-title">Servicios</p>
            <ul class="footer-links">
              <li><a href="#">Consulta general</a></li>
              <li><a href="#">Especialidades</a></li>
              <li><a href="#">Urgencias</a></li>
              <li><a href="#">Telemedicina</a></li>
            </ul>
          </div>

          <div class="footer-links-col">
            <p class="footer-col-title">Empresa</p>
            <ul class="footer-links">
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Prensa</a></li>
              <li><a href="#">Carreras</a></li>
            </ul>
          </div>

          <div class="footer-links-col">
            <p class="footer-col-title">Contacto</p>
            <ul class="footer-links footer-contact">
              <li>
                <v-icon size="14" color="#5C6BC0">mdi-phone</v-icon>
                +52 800 123 4567
              </li>
              <li>
                <v-icon size="14" color="#5C6BC0">mdi-email-outline</v-icon>
                hola@medibook.mx
              </li>
              <li>
                <v-icon size="14" color="#5C6BC0">mdi-map-marker-outline</v-icon>
                Ciudad de México, MX
              </li>
            </ul>
          </div>
        </div>

        <!-- Footer bottom -->
        <v-divider class="footer-divider" />
        <div class="d-flex flex-column flex-sm-row align-center justify-space-between py-4 ga-2">
          <p class="footer-copy mb-0">
            © {{ new Date().getFullYear() }} MediBook. Todos los derechos reservados.
          </p>
          <div class="d-flex ga-3">
            <a href="#" class="footer-legal-link">Privacidad</a>
            <a href="#" class="footer-legal-link">Términos</a>
            <a href="#" class="footer-legal-link">Cookies</a>
          </div>
        </div>

      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'

const scrollY = ref(0)
const drawerOpen = ref(false)

function onScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const scrolled = computed(() => scrollY.value > 20)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* ─── Reset & Base ─────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

:root {
  --primary:      #5C6BC0;
  --primary-dark: #3949AB;
  --accent:       #26C6DA;
  --accent-light: #e0f7fa;
  --bg:           #f0f2ff;
  --surface:      rgba(255,255,255,0.92);
  --text-main:    #1a1f3c;
  --text-muted:   #7b85a8;
  --border:       rgba(92,107,192,0.12);
  --shadow-sm:    0 2px 12px rgba(92,107,192,0.10);
  --shadow-md:    0 6px 24px rgba(92,107,192,0.14);
  --shadow-lg:    0 12px 40px rgba(92,107,192,0.20);
  --radius-sm:    8px;
  --radius-md:    12px;
  --radius-lg:    16px;
  --radius-xl:    24px;
}

/* ─── App Root ─────────────────────────────────── */
.app-root {
  background: linear-gradient(150deg, #eef0ff 0%, #e5f4fb 45%, #eef0ff 100%) !important;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
}

/* ─── Logo & Brand ─────────────────────────────── */
.logo-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(92,107,192,0.38);
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.logo-icon-wrapper:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(92,107,192,0.45);
}

.logo-text {
  font-size: 1.18rem;
  font-weight: 800;
  color: var(--primary-dark);
  letter-spacing: -0.6px;
  white-space: nowrap;
}
.logo-dot { color: var(--accent); }

/* ─── Navbar ───────────────────────────────────── */
.nav-bar {
  position: fixed !important;
  top: 0 !important; left: 0 !important; right: 0 !important;
  z-index: 200 !important;
  background: rgba(255,255,255,0.72) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border-bottom: 1px solid transparent !important;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.nav-bar.nav-scrolled {
  background: rgba(255,255,255,0.96) !important;
  border-bottom-color: var(--border) !important;
  box-shadow: var(--shadow-sm) !important;
}

.nav-logo { user-select: none; }

.nav-link-btn {
  color: var(--primary) !important;
  font-size: 0.84rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.1px !important;
  transition: background 0.18s ease, color 0.18s ease !important;
}
.nav-link-btn:hover {
  background-color: rgba(92,107,192,0.07) !important;
  color: var(--primary-dark) !important;
}

.nav-divider {
  width: 1px;
  height: 22px;
  background: var(--border);
  border-radius: 2px;
}

/* ─── Book Button ──────────────────────────────── */
.book-btn {
  background: linear-gradient(135deg, var(--primary) 0%, #7986CB 50%, var(--accent) 100%) !important;
  background-size: 200% 200% !important;
  background-position: 0% 50% !important;
  color: white !important;
  border-radius: var(--radius-md) !important;
  padding: 0 18px !important;
  font-size: 0.84rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.1px !important;
  box-shadow: 0 4px 16px rgba(92,107,192,0.38) !important;
  transition: all 0.3s ease !important;
}
.book-btn:hover {
  background-position: 100% 50% !important;
  box-shadow: 0 7px 22px rgba(92,107,192,0.52) !important;
  transform: translateY(-1px);
}
.book-btn:active { transform: translateY(0); }

/* ─── Hamburger ────────────────────────────────── */
.hamburger-btn {
  border-radius: var(--radius-sm) !important;
  transition: background 0.18s ease !important;
}
.hamburger-btn:hover {
  background-color: rgba(92,107,192,0.08) !important;
}

/* ─── Drawer ───────────────────────────────────── */
.mobile-drawer .v-navigation-drawer__content {
  background: rgba(255,255,255,0.98) !important;
  font-family: 'Plus Jakarta Sans', sans-serif !important;
}

.drawer-header {
  background: linear-gradient(135deg,
    rgba(92,107,192,0.07) 0%,
    rgba(38,198,218,0.07) 100%);
}

.drawer-tagline {
  font-size: 0.76rem;
  color: var(--text-muted);
  font-weight: 500;
}

.drawer-divider {
  border-color: var(--border) !important;
}

.drawer-item {
  color: var(--primary-dark) !important;
  min-height: 44px !important;
  transition: background 0.18s ease !important;
}
.drawer-item:hover { background: rgba(92,107,192,0.07) !important; }
.drawer-item-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.contact-chip {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  background: rgba(92,107,192,0.07);
  padding: 5px 10px;
  border-radius: 20px;
}

.drawer-footer {
  margin-top: auto;
}

/* ─── Main Content ─────────────────────────────── */
.main-content {
  padding-top: 68px !important;
  min-height: 100vh;
}

/* ─── Footer ───────────────────────────────────── */
.app-footer {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
}

@media (max-width: 959px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .footer-brand-col { grid-column: 1 / -1; }
}

@media (max-width: 599px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.footer-desc {
  font-size: 0.83rem;
  color: var(--text-muted);
  line-height: 1.65;
  max-width: 280px;
}

.footer-col-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--primary-dark);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 14px !important;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.footer-links a {
  font-size: 0.83rem;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.18s ease;
}
.footer-links a:hover { color: var(--primary); }

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.83rem;
  color: var(--text-muted);
  font-weight: 500;
}

.footer-divider { border-color: var(--border) !important; }

.footer-copy {
  font-size: 0.77rem;
  color: var(--text-muted);
}

.footer-legal-link {
  font-size: 0.77rem;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.18s ease;
}
.footer-legal-link:hover { color: var(--primary); }

.footer-social-btn {
  border-radius: var(--radius-sm) !important;
  transition: transform 0.18s ease, box-shadow 0.18s ease !important;
}
.footer-social-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm) !important;
}

/* ─── Page Transitions ─────────────────────────── */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ─── Scrollbar ─────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: rgba(92,107,192,0.25);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover { background: rgba(92,107,192,0.45); }
</style>