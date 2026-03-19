<template>
  <div class="doctors-view">
    <v-container style="max-width: 1200px;" class="py-6 py-sm-8 py-md-12">
      <div class="doctors-header text-center mb-10">
        <div class="section-tag mb-3">Nuestro equipo médico</div>
        <h2 class="section-title mb-2">
          Especialistas <span class="gradient-text">certificados</span>
        </h2>
        <p class="section-subtitle">
          Más de 120 doctores especializados listos para atenderte
        </p>
      </div>

      <v-row>
        <v-col
          v-for="doctor in doctors"
          :key="doctor.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="doctor-card glass-card"
            elevation="0"
            :class="{ 'doctor-card--unavailable': !doctor.available }"
          >
            <v-card-text class="pa-5">
              <div class="d-flex align-center mb-4">
                <div class="doctor-avatar" :style="{ '--doctor-color': doctor.color }">
                  <v-icon :icon="doctor.icon" color="white" size="28" />
                </div>
                <div class="ml-3 flex-grow-1">
                  <h3 class="doctor-name mb-0">{{ doctor.name }}</h3>
                  <p class="doctor-specialty mb-0">{{ doctor.specialty }}</p>
                </div>
                <v-chip
                  v-if="doctor.available"
                  size="small"
                  color="success"
                  variant="flat"
                  class="font-weight-medium"
                >
                  Disponible
                </v-chip>
                <v-chip
                  v-else
                  size="small"
                  color="grey"
                  variant="flat"
                  class="font-weight-medium"
                >
                  No disponible
                </v-chip>
              </div>

              <p class="doctor-description mb-4">{{ doctor.description }}</p>

              <div class="d-flex align-center justify-space-between mb-4">
                <div class="d-flex align-center ga-2">
                  <v-icon size="16" color="warning">mdi-star</v-icon>
                  <span class="doctor-rating">{{ doctor.rating }}</span>
                  <span class="text-body-2 text-medium-emphasis">(120 reseñas)</span>
                </div>
                <v-icon size="18" color="primary">mdi-account</v-icon>
              </div>

              <v-btn
                block
                :disabled="!doctor.available"
                :to="doctor.available ? '/booking' : null"
                :color="doctor.available ? 'primary' : 'grey'"
                :variant="doctor.available ? 'flat' : 'outlined'"
                rounded="lg"
                @click="doctor.available ? selectDoctor(doctor) : null"
              >
                {{ doctor.available ? 'Agendar cita' : 'No disponible' }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useDoctorsStore } from '@/stores/doctorsStore'
import { useBookingStore } from '@/stores/bookingStore'

const doctorsStore = useDoctorsStore()
const bookingStore = useBookingStore()

const doctors = doctorsStore.doctors

function selectDoctor(doctor) {
  bookingStore.selectService(doctor.specialty)
}
</script>

<style scoped>
.doctors-view {
  min-height: calc(100vh - 70px);
  padding-top: 40px;
  padding-bottom: 40px;
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

.glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(92, 107, 192, 0.18) !important;
  border-color: rgba(92, 107, 192, 0.3) !important;
}

.doctor-card--unavailable {
  opacity: 0.7;
}

.doctor-card--unavailable:hover {
  transform: none;
}

.doctor-avatar {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--doctor-color) 0%, color-mix(in srgb, var(--doctor-color) 70%, #26C6DA 30%) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px color-mix(in srgb, var(--doctor-color) 35%, transparent 65%);
  flex-shrink: 0;
}

.doctor-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1f5e;
}

.doctor-specialty {
  font-size: 0.82rem;
  color: #5C6BC0;
  font-weight: 600;
}

.doctor-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0;
}

.doctor-rating {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1f5e;
}
</style>
