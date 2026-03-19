<template>
  <div class="confirmation-view">
    <v-container style="max-width: 720px;" class="py-6 py-sm-10 py-md-14 px-3 px-sm-4">
      <!-- Confetti particles -->
      <div class="confetti-wrapper" aria-hidden="true">
        <div v-for="n in 12" :key="n" class="confetti-piece" :style="confettiStyle(n)" />
      </div>

      <v-card class="confirmation-card glass-card" elevation="0">
        <v-card-text class="pa-5 pa-sm-7 pa-md-10 text-center">
          <!-- Success Icon -->
          <div class="success-ring mb-6">
            <div class="success-circle">
              <v-icon icon="mdi-check" color="white" size="42" />
            </div>
          </div>

          <h2 class="confirm-title mb-2">¡Cita confirmada!</h2>
          <p class="confirm-subtitle mb-8">
            Tu cita médica ha sido agendada exitosamente.<br />
            Revisa tu correo para los detalles.
          </p>

          <!-- Details card -->
          <v-card class="details-card mb-6" elevation="0">
            <v-card-text class="pa-5">
              <h4 class="details-title mb-4">Detalles de tu cita</h4>

              <div v-if="appointment">
                <div class="detail-row">
                  <div class="detail-icon-box">
                    <v-icon size="18" color="primary">mdi-stethoscope</v-icon>
                  </div>
                  <div class="ml-3 text-left">
                    <p class="detail-label">Servicio</p>
                    <p class="detail-value">{{ appointment.service }}</p>
                  </div>
                </div>

                <v-divider class="my-3 opacity-40" />

                <div class="detail-row">
                  <div class="detail-icon-box">
                    <v-icon size="18" color="primary">mdi-calendar</v-icon>
                  </div>
                  <div class="ml-3 text-left">
                    <p class="detail-label">Fecha</p>
                    <p class="detail-value">{{ appointment.date }}</p>
                  </div>
                </div>

                <v-divider class="my-3 opacity-40" />

                <div class="detail-row">
                  <div class="detail-icon-box">
                    <v-icon size="18" color="primary">mdi-clock-outline</v-icon>
                  </div>
                  <div class="ml-3 text-left">
                    <p class="detail-label">Hora</p>
                    <p class="detail-value">{{ appointment.time }}</p>
                  </div>
                </div>

                <v-divider class="my-3 opacity-40" />

                <div class="detail-row">
                  <div class="detail-icon-box">
                    <v-icon size="18" color="primary">mdi-account</v-icon>
                  </div>
                  <div class="ml-3 text-left">
                    <p class="detail-label">Paciente</p>
                    <p class="detail-value">{{ appointment.patientName }}</p>
                  </div>
                </div>

                <v-divider class="my-3 opacity-40" />

                <div class="detail-row">
                  <div class="detail-icon-box">
                    <v-icon size="18" color="primary">mdi-email-outline</v-icon>
                  </div>
                  <div class="ml-3 text-left">
                    <p class="detail-label">Email</p>
                    <p class="detail-value">{{ appointment.patientEmail }}</p>
                  </div>
                </div>

                <v-divider class="my-3 opacity-40" />

                <div class="detail-row">
                  <div class="detail-icon-box">
                    <v-icon size="18" color="primary">mdi-phone-outline</v-icon>
                  </div>
                  <div class="ml-3 text-left">
                    <p class="detail-label">Teléfono</p>
                    <p class="detail-value">{{ appointment.patientPhone }}</p>
                  </div>
                </div>
              </div>

              <div v-else class="py-4 text-medium-emphasis">
                <v-icon size="40" color="grey-lighten-2" class="mb-2">mdi-calendar-question</v-icon>
                <p class="text-body-2">No se encontraron detalles de la cita.</p>
              </div>
            </v-card-text>
          </v-card>

          <!-- ID badge -->
          <div v-if="appointment" class="appointment-id-badge mb-6">
            <v-icon size="14" color="primary" class="mr-1">mdi-identifier</v-icon>
            <span>ID de cita: <strong>{{ appointment.id }}</strong></span>
          </div>

          <!-- Action buttons -->
          <div class="d-flex flex-column flex-sm-row ga-3 justify-center">
            <v-btn
              class="action-btn-primary"
              size="large"
              @click="goHome"
            >
              <v-icon start>mdi-home-outline</v-icon>
              Volver al inicio
            </v-btn>
            <v-btn
              variant="outlined"
              class="action-btn-outline"
              size="large"
              @click="newAppointment"
            >
              <v-icon start>mdi-calendar-plus</v-icon>
              Nueva cita
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { useRouter } from 'vue-router'

const bookingStore = useBookingStore()
const router = useRouter()

const appointment = computed(() => {
  return bookingStore.appointments.at(-1) ?? null
})

function goHome() {
  router.push('/')
}

function newAppointment() {
  bookingStore.resetAll()
  router.push('/booking')
}

function confettiStyle(n) {
  const colors = ['#5C6BC0', '#26C6DA', '#7C4DFF', '#FFA726', '#26A69A', '#E53935']
  const size = 6 + (n % 4) * 3
  return {
    left: `${(n * 8.3) % 100}%`,
    animationDelay: `${(n * 0.2) % 1.5}s`,
    animationDuration: `${1.2 + (n % 5) * 0.3}s`,
    background: colors[n % colors.length],
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: n % 3 === 0 ? '50%' : '2px',
  }
}
</script>

<style scoped>
.confirmation-view {
  min-height: calc(100vh - 70px);
  position: relative;
  overflow: hidden;
}

/* Confetti */
.confetti-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  height: 200px;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  top: -10px;
  animation: confetti-fall linear forwards;
  opacity: 0.8;
}

@keyframes confetti-fall {
  0% { transform: translateY(-10px) rotate(0deg); opacity: 0.9; }
  100% { transform: translateY(250px) rotate(360deg); opacity: 0; }
}

/* Confirmation card */
.confirmation-card {
  border: 1px solid rgba(92, 107, 192, 0.15) !important;
  position: relative;
  z-index: 1;
}

/* Success ring animation */
.success-ring {
  display: flex;
  justify-content: center;
}

.success-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #26A69A 0%, #26C6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 12px rgba(38, 166, 154, 0.12), 0 8px 28px rgba(38, 166, 154, 0.4);
  animation: success-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@media (min-width: 600px) {
  .success-circle {
    width: 96px;
    height: 96px;
    box-shadow: 0 0 0 16px rgba(38, 166, 154, 0.12), 0 8px 28px rgba(38, 166, 154, 0.4);
  }
}

@keyframes success-pop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

.confirm-title {
  font-size: clamp(1.5rem, 5vw, 2.4rem);
  font-weight: 800;
  color: #1a1f5e;
  letter-spacing: -0.5px;
}

.confirm-subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.7;
}

/* Details card */
.details-card {
  background: rgba(240, 242, 255, 0.6) !important;
  border: 1.5px solid rgba(92, 107, 192, 0.12) !important;
  border-radius: 16px !important;
  text-align: left;
}

.details-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #5C6BC0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-row {
  display: flex;
  align-items: center;
}

.detail-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(92, 107, 192, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-label {
  font-size: 0.72rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 1px;
}

.detail-value {
  font-size: 0.92rem;
  font-weight: 700;
  color: #1a1f5e;
  margin-bottom: 0;
}

/* ID badge */
.appointment-id-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(92, 107, 192, 0.08);
  border: 1px solid rgba(92, 107, 192, 0.2);
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 0.78rem;
  color: #5C6BC0;
}

/* Action buttons */
.action-btn-primary {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%) !important;
  color: white !important;
  border-radius: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0 !important;
  box-shadow: 0 6px 18px rgba(92, 107, 192, 0.4) !important;
  transition: all 0.3s ease !important;
}

.action-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(92, 107, 192, 0.5) !important;
}

.action-btn-outline {
  border-color: rgba(92, 107, 192, 0.35) !important;
  color: #5C6BC0 !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
}
</style>
