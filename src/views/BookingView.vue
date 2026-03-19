<template>
  <div class="booking-view">
    <v-container style="max-width: 1100px;" class="py-6 py-sm-8 py-md-12 px-3 px-sm-4">
      <div class="booking-header text-center mb-8">
        <div class="booking-header-tag mb-3">
          <v-icon size="14" class="mr-1">mdi-calendar-clock</v-icon>
          Reserva de cita
        </div>
        <h2 class="booking-title mb-2">Agendar cita médica</h2>
        <p class="booking-subtitle">Completa los pasos para confirmar tu consulta</p>
      </div>

      <v-card class="booking-card glass-card" elevation="0">
        <div class="stepper-header px-4 px-sm-6 pt-6 pb-0">
          <div class="stepper-track">
            <div
              v-for="(step, i) in stepList"
              :key="step.label"
              class="stepper-item"
              :class="{
                'stepper-item--active': currentStep === i + 1,
                'stepper-item--completed': currentStep > i + 1
              }"
            >
              <div class="stepper-circle">
                <v-icon v-if="currentStep > i + 1" size="16" color="white">mdi-check</v-icon>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <div class="stepper-info d-none d-sm-flex">
                <span class="stepper-label">{{ step.label }}</span>
              </div>
              <div v-if="i < stepList.length - 1" class="stepper-connector">
                <div class="stepper-connector-fill" :style="{ width: currentStep > i + 1 ? '100%' : '0%' }" />
              </div>
            </div>
          </div>
        </div>

        <v-divider class="mt-5" />

        <div class="pa-4 pa-sm-5 pa-md-8 overflow-hidden">
          <Transition name="slide-step" mode="out-in">
            <div v-if="currentStep === 1" key="step1">
              <div class="step-content-header mb-6">
                <div class="step-content-icon">
                  <v-icon color="white" size="20">mdi-clipboard-text-search</v-icon>
                </div>
                <div class="ml-3">
                  <h3 class="step-content-title mb-0">Selecciona un servicio</h3>
                  <p class="step-content-subtitle mb-0">Elige el tipo de consulta que necesitas</p>
                </div>
              </div>

              <v-row>
                <v-col
                  v-for="service in services"
                  :key="service.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <ServiceCard
                    :id="service.id"
                    :nombre="service.nombre"
                    :descripcion="service.descripcion"
                    :duracion="service.duracion"
                    :icon="service.icon"
                    :is-selected="selectedService === service.nombre"
                    @selected="selectService"
                  />
                </v-col>
              </v-row>
            </div>

            <div v-else-if="currentStep === 2" key="step2">
              <div class="step-content-header mb-6">
                <div class="step-content-icon">
                  <v-icon color="white" size="20">mdi-calendar-today</v-icon>
                </div>
                <div class="ml-3">
                  <h3 class="step-content-title mb-0">Fecha y horario</h3>
                  <p class="step-content-subtitle mb-0">Elige el día y la hora que más te convenga</p>
                </div>
              </div>

              <v-row>
                <v-col cols="12" md="6">
                  <v-card class="glass-card date-picker-card h-100" elevation="0">
                    <v-card-text class="pa-4">
                      <div class="d-flex align-center mb-3">
                        <v-icon color="primary" size="18" class="mr-2">mdi-calendar-month</v-icon>
                        <span class="text-body-2 font-weight-semibold text-primary">Selecciona fecha</span>
                      </div>
                      <v-date-picker
                        v-model="selectedDate"
                        locale="es-MX"
                        :min="today"
                        color="primary"
                        hide-header
                        elevation="0"
                        class="date-picker-clean w-100"
                        @update:model-value="loadAvailability"
                      />
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="glass-card h-100" elevation="0">
                    <v-card-text class="pa-4 h-100">
                      <TimeSlotPicker />
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div v-else-if="currentStep === 3" key="step3">
              <div class="step-content-header mb-6">
                <div class="step-content-icon">
                  <v-icon color="white" size="20">mdi-account-check</v-icon>
                </div>
                <div class="ml-3">
                  <h3 class="step-content-title mb-0">Confirma tus datos</h3>
                  <p class="step-content-subtitle mb-0">Ingresa tu información para finalizar</p>
                </div>
              </div>

              <v-row>
                <v-col cols="12" md="5">
                  <v-card class="summary-card glass-card mb-4" elevation="0">
                    <v-card-text class="pa-5">
                      <div class="d-flex align-center mb-4">
                        <div class="summary-title-icon mr-2">
                          <v-icon color="white" size="16">mdi-text-box-check</v-icon>
                        </div>
                        <span class="summary-title">Resumen de cita</span>
                      </div>

                      <div class="summary-row">
                        <div class="summary-icon-box">
                          <v-icon size="16" color="primary">mdi-stethoscope</v-icon>
                        </div>
                        <div class="ml-3">
                          <p class="summary-row-label">Servicio</p>
                          <p class="summary-row-value">{{ selectedService || '—' }}</p>
                        </div>
                      </div>

                      <v-divider class="my-3 opacity-50" />

                      <div class="summary-row">
                        <div class="summary-icon-box">
                          <v-icon size="16" color="primary">mdi-calendar</v-icon>
                        </div>
                        <div class="ml-3">
                          <p class="summary-row-label">Fecha</p>
                          <p class="summary-row-value text-capitalize">{{ formattedDate || '—' }}</p>
                        </div>
                      </div>

                      <v-divider class="my-3 opacity-50" />

                      <div class="summary-row">
                        <div class="summary-icon-box">
                          <v-icon size="16" color="primary">mdi-clock-outline</v-icon>
                        </div>
                        <div class="ml-3">
                          <p class="summary-row-label">Hora</p>
                          <p class="summary-row-value">{{ selectedTime || '—' }}</p>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>

                  <v-alert
                    type="info"
                    variant="tonal"
                    rounded="lg"
                    density="compact"
                    border="start"
                    class="text-body-2"
                  >
                    Recibirás un correo de confirmación una vez que completes tu cita.
                  </v-alert>
                </v-col>
                <v-col cols="12" md="7">
                  <BookingForm />
                </v-col>
              </v-row>
            </div>
          </Transition>

          <div class="d-flex align-center mt-8 ga-2 ga-sm-3">
            <v-btn
              v-if="currentStep > 1"
              variant="outlined"
              class="nav-btn-back"
              rounded="lg"
              size="small"
              @click="prevStep"
            >
              <v-icon start size="16">mdi-arrow-left</v-icon>
              <span class="d-none d-sm-inline">Atrás</span>
            </v-btn>

            <v-spacer />

            <div class="d-flex ga-1">
              <div
                v-for="i in 3"
                :key="i"
                class="progress-dot"
                :class="{ 'progress-dot--active': currentStep >= i }"
              />
            </div>

            <v-spacer />

            <v-btn
              v-if="currentStep < 3"
              class="nav-btn-next"
              rounded="lg"
              size="small"
              :disabled="!canGoNext"
              @click="nextStep"
            >
              <span class="d-none d-sm-inline">Siguiente</span>
              <v-icon :start="true" size="16" class="d-sm-none">mdi-arrow-right</v-icon>
              <v-icon end size="16" class="d-none d-sm-flex">mdi-arrow-right</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { useAvailabilityStore } from '@/stores/availabilityStore'
import ServiceCard from '@/components/booking/ServiceCard.vue'
import TimeSlotPicker from '@/components/calendar/TimeSlotPicker.vue'
import BookingForm from '@/components/booking/BookingForm.vue'

const bookingStore = useBookingStore()
const availabilityStore = useAvailabilityStore()

const stepList = [
  { label: 'Servicio' },
  { label: 'Fecha y hora' },
  { label: 'Tus datos' },
]

const services = ref([
  { id: 'svc_1', nombre: 'Consulta general', descripcion: 'Evaluación médica completa', duracion: 30, icon: 'mdi-stethoscope' },
  { id: 'svc_2', nombre: 'Pediatría', descripcion: 'Atención especializada para niños', duracion: 40, icon: 'mdi-baby' },
  { id: 'svc_3', nombre: 'Cardiología', descripcion: 'Chequeo cardiovascular', duracion: 45, icon: 'mdi-heart-pulse' },
  { id: 'svc_4', nombre: 'Dermatología', descripcion: 'Diagnóstico y tratamiento de piel', duracion: 35, icon: 'mdi-face-man-shimmer' },
  { id: 'svc_5', nombre: 'Laboratorio', descripcion: 'Análisis clínicos', duracion: 20, icon: 'mdi-test-tube' },
  { id: 'svc_6', nombre: 'Vacunación', descripcion: 'Aplicación de vacunas', duracion: 15, icon: 'mdi-syringe' },
])

const currentStep = computed({
  get: () => bookingStore.currentStep,
  set: (val) => bookingStore.goToStep(val)
})

const selectedService = computed(() => bookingStore.selectedService)

const selectedDate = computed({
  get: () => {
    // Si hay una fecha en el store, la convertimos a objeto Date para Vuetify
    if (bookingStore.selectedDate) {
      // Usamos el constructor Date con los componentes para evitar problemas de timezone
      const [year, month, day] = bookingStore.selectedDate.split('-')
      return new Date(year, month - 1, day)
    }
    return null
  },
  set: (val) => {
    if (val) {
      // Convertimos el Date object a string YYYY-MM-DD local
      const offset = val.getTimezoneOffset()
      val = new Date(val.getTime() - (offset*60*1000))
      bookingStore.selectDate(val.toISOString().split('T')[0])
    } else {
      bookingStore.selectDate(null)
    }
  }
})

const selectedTime = computed(() => bookingStore.selectedTime)

// Calculamos el string YYYY-MM-DD para el atributo "min" del datepicker
const today = new Date().toLocaleDateString('en-CA') // Format: YYYY-MM-DD

const formattedDate = computed(() => {
  if (!bookingStore.selectedDate) return ''
  // Ajuste para evitar desfase de 1 día por zonas horarias al mostrar
  const [year, month, day] = bookingStore.selectedDate.split('-')
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

const canGoNext = computed(() => {
  if (currentStep.value === 1) return !!selectedService.value
  if (currentStep.value === 2) return !!bookingStore.selectedDate && !!selectedTime.value
  return true
})

function selectService(serviceId) {
  const service = services.value.find(s => s.id === serviceId)
  if (service) {
    bookingStore.selectService(service.nombre)
  }
}

function loadAvailability(date) {
  if (date) {
    // Asegurarnos de enviar el formato correcto al store
    const offset = date.getTimezoneOffset()
    const localDate = new Date(date.getTime() - (offset*60*1000))
    availabilityStore.loadAvailability(localDate.toISOString().split('T')[0])
  }
}

function nextStep() {
  if (currentStep.value < 3) bookingStore.goToStep(currentStep.value + 1)
}

function prevStep() {
  if (currentStep.value > 1) bookingStore.goToStep(currentStep.value - 1)
}
</script>

<style scoped>
.booking-view {
  min-height: calc(100vh - 70px);
}

.glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
}

/* Header */
.booking-header-tag {
  display: inline-flex;
  align-items: center;
  background: rgba(92, 107, 192, 0.1);
  color: #5C6BC0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid rgba(92, 107, 192, 0.2);
}

.booking-title {
  font-size: clamp(1.35rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #1a1f5e;
  letter-spacing: -0.5px;
}

.booking-subtitle {
  font-size: 1rem;
  color: #6b7280;
}

/* Card */
.booking-card {
  border: 1px solid rgba(92, 107, 192, 0.15) !important;
  border-radius: 16px;
}

/* Stepper Header */
.stepper-track {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  /* Fixed width to prevent connector issues */
  width: 33%; 
}

.stepper-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(92, 107, 192, 0.1);
  border: 2px solid rgba(92, 107, 192, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: #9BA3C5;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

@media (min-width: 600px) {
  .stepper-circle { width: 38px; height: 38px; }
}

.stepper-item--active .stepper-circle {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 14px rgba(92, 107, 192, 0.4);
  transform: scale(1.1);
}

.stepper-item--completed .stepper-circle {
  background: linear-gradient(135deg, #26A69A 0%, #26C6DA 100%);
  border-color: transparent;
  color: white;
  box-shadow: 0 3px 10px rgba(38, 166, 154, 0.35);
}

.stepper-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9BA3C5;
  margin-top: 8px;
  display: block;
  text-align: center;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.stepper-item--active .stepper-label {
  color: #5C6BC0;
}

.stepper-item--completed .stepper-label {
  color: #26A69A;
}

.stepper-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stepper-connector {
  position: absolute;
  top: 17px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: rgba(92, 107, 192, 0.12);
  overflow: hidden;
  z-index: 1;
}

@media (min-width: 600px) {
  .stepper-connector { top: 19px; }
}

.stepper-connector-fill {
  height: 100%;
  background: linear-gradient(90deg, #5C6BC0 0%, #26C6DA 100%);
  transition: width 0.5s ease;
}

/* Step content */
.step-content-header {
  display: flex;
  align-items: center;
}

.step-content-icon {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(92, 107, 192, 0.3);
}

@media (min-width: 600px) {
  .step-content-icon { width: 44px; height: 44px; border-radius: 13px; }
}

.step-content-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1f5e;
}

.step-content-subtitle {
  font-size: 0.83rem;
  color: #6b7280;
}

/* Date picker */
.date-picker-card {
  border: 1.5px solid rgba(92, 107, 192, 0.15) !important;
}

.date-picker-clean :deep(.v-date-picker) {
  box-shadow: none !important;
  width: 100%;
}

.date-picker-clean :deep(.v-date-picker-controls) {
  justify-content: space-between;
}

/* Summary card */
.summary-card {
  border: 1.5px solid rgba(92, 107, 192, 0.15) !important;
}

.summary-title-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1f5e;
}

.summary-row {
  display: flex;
  align-items: center;
}

.summary-icon-box {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(92, 107, 192, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.summary-row-label {
  font-size: 0.72rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1px;
  font-weight: 600;
}

.summary-row-value {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1f5e;
  margin-bottom: 0;
}

/* Navigation buttons */
.nav-btn-back {
  border-color: rgba(92, 107, 192, 0.3) !important;
  color: #5C6BC0 !important;
  font-weight: 600 !important;
}

.nav-btn-next {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  box-shadow: 0 4px 14px rgba(92, 107, 192, 0.35) !important;
}

.nav-btn-next:hover:not(:disabled) {
  box-shadow: 0 6px 20px rgba(92, 107, 192, 0.5) !important;
  transform: translateY(-1px);
}

/* Progress dots */
.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(92, 107, 192, 0.2);
  transition: all 0.3s ease;
}

.progress-dot--active {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  box-shadow: 0 2px 6px rgba(92, 107, 192, 0.4);
}

/* Step transitions */
.slide-step-enter-active,
.slide-step-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>