<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="blob blob-1" />
      <div class="blob blob-2" />
      <div class="blob blob-3" />

      <v-container style="max-width: 1200px; position: relative; z-index: 1;">
        <v-row align="center" justify="center" class="py-12 py-md-16">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <div class="hero-badge d-inline-flex align-center mb-5">
              <span class="badge-dot" />
              <span class="badge-text">Plataforma Médica Digital #1</span>
            </div>

            <h1 class="hero-title mb-5">
              Tu salud,<br />
              <span class="gradient-text">nuestra prioridad</span>
            </h1>

            <p class="hero-subtitle mb-8">
              Agenda tu cita médica en menos de 2 minutos. Más de <strong>15,000 pacientes</strong>
              confían en nuestro sistema para sus consultas.
            </p>

            <div class="d-flex flex-wrap ga-3 justify-center justify-md-start">
              <v-btn
                size="large"
                class="hero-cta-primary"
                @click="goToBooking"
              >
                <v-icon start>mdi-calendar-plus</v-icon>
                Agendar cita ahora
              </v-btn>
              <v-btn
                size="large"
                variant="outlined"
                class="hero-cta-secondary"
              >
                <v-icon start>mdi-play-circle-outline</v-icon>
                Ver cómo funciona
              </v-btn>
            </div>

            <div class="d-flex align-center ga-3 mt-8 justify-center justify-md-start">
              <div class="trust-avatars">
                <v-avatar size="32" color="primary" class="trust-avatar">
                  <v-icon size="16" color="white">mdi-account</v-icon>
                </v-avatar>
                <v-avatar size="32" color="secondary" class="trust-avatar">
                  <v-icon size="16" color="white">mdi-account</v-icon>
                </v-avatar>
                <v-avatar size="32" color="accent" class="trust-avatar">
                  <v-icon size="16" color="white">mdi-account</v-icon>
                </v-avatar>
              </div>
              <div>
                <div class="d-flex align-center ga-1">
                  <v-icon size="14" color="warning">mdi-star</v-icon>
                  <v-icon size="14" color="warning">mdi-star</v-icon>
                  <v-icon size="14" color="warning">mdi-star</v-icon>
                  <v-icon size="14" color="warning">mdi-star</v-icon>
                  <v-icon size="14" color="warning">mdi-star</v-icon>
                </div>
                <p class="trust-text mb-0">+15,000 pacientes activos</p>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="5" class="d-flex justify-center">
            <div class="hero-card-wrapper">
              <v-card class="hero-visual-card glass-card elevation-0" rounded="xl">
                <v-card-text class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <div class="logo-icon-wrapper-hero mr-3">
                      <v-icon icon="mdi-heart-pulse" color="white" size="20" />
                    </div>
                    <div>
                      <p class="text-caption text-medium-emphasis mb-0">Próxima cita</p>
                      <p class="text-body-2 font-weight-bold mb-0 text-primary">Hoy disponible</p>
                    </div>
                    <v-spacer />
                    <v-chip size="x-small" color="success" variant="flat">Activo</v-chip>
                  </div>

                  <v-divider class="mb-4" />

                  <div
                    v-for="(item, i) in previewSlots"
                    :key="i"
                    class="d-flex align-center mb-3"
                    :class="{ 'mb-0': i === previewSlots.length - 1 }"
                  >
                    <div class="time-indicator" :class="`indicator-${item.color}`" />
                    <div class="ml-3 flex-grow-1">
                      <p class="text-body-2 font-weight-medium mb-0">{{ item.doctor }}</p>
                      <p class="text-caption text-medium-emphasis mb-0">{{ item.specialty }}</p>
                    </div>
                    <v-chip
                      size="x-small"
                      :color="item.color"
                      :variant="item.available ? 'tonal' : 'flat'"
                    >
                      {{ item.time }}
                    </v-chip>
                  </div>

                  <v-divider class="my-4" />

                  <v-btn
                    block
                    class="hero-card-btn"
                    size="small"
                    @click="goToBooking"
                  >
                    <v-icon start size="16">mdi-calendar-check</v-icon>
                    Reservar ahora
                  </v-btn>
                </v-card-text>
              </v-card>

              <div class="floating-badge badge-top-right d-none d-sm-flex">
                <v-icon size="18" color="success">mdi-shield-check</v-icon>
                <span>100% Seguro</span>
              </div>
              <div class="floating-badge badge-bottom-left d-none d-sm-flex">
                <v-icon size="18" color="primary">mdi-clock-fast</v-icon>
                <span>En 2 minutos</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="stats-section">
      <v-container style="max-width: 1200px;">
        <v-row justify="center">
          <v-col
            v-for="stat in stats"
            :key="stat.label"
            cols="6"
            sm="3"
            class="text-center"
          >
            <div class="stat-item">
              <div class="stat-icon-wrapper mb-2">
                <v-icon :icon="stat.icon" :color="stat.color" size="24" />
              </div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="services-section">
      <v-container style="max-width: 1200px;">
        <div class="section-header text-center mb-10">
          <div class="section-tag mb-3">Nuestros servicios</div>
          <h2 class="section-title">
            Todo lo que necesitas<br />
            <span class="gradient-text">en un solo lugar</span>
          </h2>
          <p class="section-subtitle">
            Especialistas de primera clase disponibles para ti
          </p>
        </div>

        <v-row>
          <v-col
            v-for="(svc, i) in services"
            :key="svc.title"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="service-feature-card glass-card cursor-pointer"
              elevation="0"
              :style="{ animationDelay: `${i * 80}ms` }"
              @click="goToBooking"
            >
              <v-card-text class="pa-6">
                <div class="service-icon-wrapper mb-4" :style="{ '--icon-color': svc.color }">
                  <v-icon :icon="svc.icon" color="white" size="26" />
                </div>
                <h3 class="service-title mb-2">{{ svc.title }}</h3>
                <p class="service-desc mb-4">{{ svc.description }}</p>
                <div class="d-flex align-center justify-space-between">
                  <v-chip size="small" variant="tonal" :color="svc.chipColor" class="font-weight-medium">
                    <v-icon start size="12">mdi-clock-outline</v-icon>
                    {{ svc.duration }}
                  </v-chip>
                  <v-icon size="18" color="primary" class="arrow-icon">mdi-arrow-right</v-icon>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="how-section">
      <v-container style="max-width: 1200px;">
        <div class="section-header text-center mb-10">
          <div class="section-tag mb-3">Proceso simple</div>
          <h2 class="section-title">
            Agenda en <span class="gradient-text">3 pasos</span>
          </h2>
        </div>

        <v-row justify="center" align="stretch" class="position-relative">
          <v-col
            v-for="(step, i) in steps"
            :key="step.title"
            cols="12"
            md="4"
          >
            <div class="how-step">
              <div class="step-number-wrapper">
                <div class="step-number">{{ i + 1 }}</div>
                <div v-if="i < steps.length - 1" class="step-connector d-none d-md-block" />
              </div>
              <div class="step-icon-box mb-4">
                <v-icon :icon="step.icon" color="white" size="28" />
              </div>
              <h3 class="step-title mb-2">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
            </div>
          </v-col>
        </v-row>

        <div class="text-center mt-10">
          <v-btn size="x-large" class="main-cta-btn" @click="goToBooking">
            <v-icon start>mdi-calendar-plus</v-icon>
            Comienza ahora — Es gratis
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToBooking() {
  router.push('/booking')
}

const previewSlots = [
  { doctor: 'Dr. García Hernández', specialty: 'Consulta General', time: '09:00', color: 'primary', available: true },
  { doctor: 'Dra. Martínez López', specialty: 'Cardiología', time: '10:30', color: 'secondary', available: true },
  { doctor: 'Dr. Romero Silva', specialty: 'Pediatría', time: '11:00', color: 'grey', available: false },
]

const stats = [
  { value: '15K+', label: 'Pacientes', icon: 'mdi-account-group', color: 'primary' },
  { value: '120+', label: 'Doctores', icon: 'mdi-doctor', color: 'secondary' },
  { value: '98%', label: 'Satisfacción', icon: 'mdi-star-circle', color: 'warning' },
  { value: '24/7', label: 'Disponible', icon: 'mdi-clock-check', color: 'success' },
]

const services = [
  {
    icon: 'mdi-stethoscope',
    title: 'Consulta General',
    description: 'Evaluación médica completa con diagnóstico y tratamiento personalizado.',
    duration: '30 min',
    color: '#5C6BC0',
    chipColor: 'primary',
  },
  {
    icon: 'mdi-heart-pulse',
    title: 'Cardiología',
    description: 'Chequeo cardiovascular avanzado con electrocardiograma incluido.',
    duration: '45 min',
    color: '#E53935',
    chipColor: 'error',
  },
  {
    icon: 'mdi-baby',
    title: 'Pediatría',
    description: 'Cuidado especializado para los más pequeños de la familia.',
    duration: '40 min',
    color: '#FF7043',
    chipColor: 'warning',
  },
  {
    icon: 'mdi-face-man-shimmer',
    title: 'Dermatología',
    description: 'Diagnóstico y tratamiento de afecciones de la piel.',
    duration: '35 min',
    color: '#8E24AA',
    chipColor: 'secondary',
  },
  {
    icon: 'mdi-test-tube',
    title: 'Laboratorio',
    description: 'Análisis clínicos completos con resultados en línea.',
    duration: '20 min',
    color: '#00897B',
    chipColor: 'success',
  },
  {
    icon: 'mdi-needle',
    title: 'Vacunación',
    description: 'Esquemas de vacunación para todas las edades.',
    duration: '15 min',
    color: '#1E88E5',
    chipColor: 'info',
  },
]

const steps = [
  {
    icon: 'mdi-clipboard-text-search',
    title: 'Elige tu servicio',
    description: 'Selecciona el tipo de consulta o especialidad que necesitas.',
  },
  {
    icon: 'mdi-calendar-today',
    title: 'Selecciona fecha y hora',
    description: 'Escoge el horario que mejor se adapte a tu agenda.',
  },
  {
    icon: 'mdi-check-decagram',
    title: 'Confirma tu cita',
    description: 'Ingresa tus datos y recibe la confirmación al instante.',
  },
]
</script>

<style scoped>
.home-view {
  overflow: hidden;
}

.hero-section {
  position: relative;
  padding: 40px 0 60px;
  overflow: hidden;
}

@media (min-width: 960px) {
  .hero-section {
    padding: 60px 0 80px;
  }
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
  max-width: 100vw;
}

.blob-1 {
  width: clamp(200px, 45vw, 500px);
  height: clamp(200px, 45vw, 500px);
  background: radial-gradient(circle, #7986CB 0%, transparent 70%);
  top: -120px;
  right: -80px;
  animation: float 8s ease-in-out infinite;
}

.blob-2 {
  width: clamp(150px, 35vw, 350px);
  height: clamp(150px, 35vw, 350px);
  background: radial-gradient(circle, #26C6DA 0%, transparent 70%);
  bottom: -80px;
  left: -60px;
  animation: float 10s ease-in-out infinite reverse;
}

.blob-3 {
  width: clamp(100px, 25vw, 250px);
  height: clamp(100px, 25vw, 250px);
  background: radial-gradient(circle, #7C4DFF 0%, transparent 70%);
  top: 40%;
  left: 40%;
  animation: float 12s ease-in-out infinite;
  display: none;
}

@media (min-width: 600px) {
  .blob-3 { display: block; }
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

.hero-badge {
  background: rgba(92, 107, 192, 0.1);
  border: 1px solid rgba(92, 107, 192, 0.25);
  border-radius: 100px;
  padding: 6px 14px;
  gap: 8px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #26C6DA;
  box-shadow: 0 0 0 3px rgba(38, 198, 218, 0.25);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 3px rgba(38, 198, 218, 0.25); }
  50% { box-shadow: 0 0 0 6px rgba(38, 198, 218, 0.1); }
}

.badge-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #5C6BC0;
  letter-spacing: 0.3px;
}

.hero-title {
  font-size: clamp(1.85rem, 6vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: #1a1f5e;
  letter-spacing: -0.5px;
}

.gradient-text {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(0.9rem, 2.5vw, 1.05rem);
  color: #6b7280;
  line-height: 1.7;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 960px) {
  .hero-subtitle {
    margin-left: 0;
    margin-right: 0;
  }
}

.hero-cta-primary {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%) !important;
  color: white !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  letter-spacing: 0 !important;
  box-shadow: 0 6px 20px rgba(92, 107, 192, 0.4) !important;
  transition: all 0.3s ease !important;
}

.hero-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(92, 107, 192, 0.5) !important;
}

.hero-cta-secondary {
  border-color: #5C6BC0 !important;
  color: #5C6BC0 !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  letter-spacing: 0 !important;
}

.trust-avatars {
  display: flex;
}

.trust-avatar {
  margin-right: -10px;
  border: 2px solid white;
}

.trust-text {
  font-size: 0.78rem;
  color: #6b7280;
}

.hero-card-wrapper {
  position: relative;
  width: 100%;
  max-width: 360px;
  padding-bottom: 24px;
}

@media (max-width: 599px) {
  .hero-card-wrapper {
    padding-bottom: 0;
    margin-top: 24px;
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
}

.hero-visual-card {
  box-shadow: 0 20px 60px rgba(92, 107, 192, 0.15) !important;
}

.logo-icon-wrapper-hero {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.indicator-primary { background: #5C6BC0; }
.indicator-secondary { background: #26C6DA; }
.indicator-grey { background: #bdbdbd; }

.hero-card-btn {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%) !important;
  color: white !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
}

.floating-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(92, 107, 192, 0.15);
  border-radius: 100px;
  padding: 8px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #374151;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  animation: float 6s ease-in-out infinite;
}

.badge-top-right {
  top: -12px;
  right: -8px;
}

.badge-bottom-left {
  bottom: -12px;
  left: -8px;
  animation-delay: -3s;
}

.stats-section {
  padding: 28px 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(92, 107, 192, 0.1);
  border-bottom: 1px solid rgba(92, 107, 192, 0.1);
}

@media (min-width: 600px) {
  .stats-section { padding: 40px 0; }
}

.stat-item {
  padding: 16px 8px;
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(92, 107, 192, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1f5e;
  letter-spacing: -0.5px;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.82rem;
  color: #6b7280;
  font-weight: 500;
}

.services-section {
  padding: 48px 0;
}

@media (min-width: 600px) {
  .services-section { padding: 64px 0; }
}

@media (min-width: 960px) {
  .services-section { padding: 80px 0; }
}

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

.section-title {
  font-size: clamp(1.5rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #1a1f5e;
  letter-spacing: -0.5px;
  line-height: 1.25;
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: 1rem;
  color: #6b7280;
}

.service-feature-card {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.service-feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(92, 107, 192, 0.18) !important;
  border-color: rgba(92, 107, 192, 0.3) !important;
}

.service-feature-card:hover .arrow-icon {
  transform: translateX(4px);
}

.service-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--icon-color) 0%, color-mix(in srgb, var(--icon-color) 70%, #26C6DA 30%) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px color-mix(in srgb, var(--icon-color) 35%, transparent 65%);
}

.service-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1f5e;
}

.service-desc {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.how-section {
  padding: 48px 0 64px;
  background: linear-gradient(180deg, rgba(240, 242, 255, 0.5) 0%, rgba(232, 244, 253, 0.5) 100%);
}

@media (min-width: 960px) {
  .how-section { padding: 80px 0 100px; }
}

.how-step {
  text-align: center;
  padding: 20px;
  position: relative;
  z-index: 2;
}

.step-number-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(92, 107, 192, 0.35);
  z-index: 2;
}

.step-connector {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 2px;
  background: rgba(92, 107, 192, 0.2);
  z-index: 1;
  transform: translateY(-50%);
}

.step-icon-box {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 8px 24px rgba(92, 107, 192, 0.3);
  transition: all 0.3s ease;
}

.how-step:hover .step-icon-box {
  transform: scale(1.08);
  box-shadow: 0 12px 32px rgba(92, 107, 192, 0.4);
}

.step-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1f5e;
}

.step-desc {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.6;
}

.main-cta-btn {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%) !important;
  color: white !important;
  border-radius: 14px !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  letter-spacing: 0 !important;
  padding: 0 32px !important;
  box-shadow: 0 8px 24px rgba(92, 107, 192, 0.4) !important;
  transition: all 0.3s ease !important;
}

.main-cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 36px rgba(92, 107, 192, 0.55) !important;
}
</style>