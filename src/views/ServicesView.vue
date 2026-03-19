<template>
  <div class="services-view">
    <v-container style="max-width: 1200px;" class="py-6 py-sm-8 py-md-12">
      <div class="services-header text-center mb-10">
        <div class="section-tag mb-3">Nuestros servicios</div>
        <h2 class="section-title mb-2">
          Todo lo que necesitas <span class="gradient-text">en un solo lugar</span>
        </h2>
        <p class="section-subtitle">
          Amplia gama de especialidades médicas para tu cuidado integral
        </p>
      </div>

      <v-row>
        <v-col
          v-for="service in services"
          :key="service.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="service-card glass-card cursor-pointer"
            elevation="0"
            :style="{ '--service-color': service.color }"
            @click="selectService(service)"
          >
            <v-card-text class="pa-5">
              <div class="service-icon-wrapper mb-4">
                <v-icon :icon="service.icon" color="white" size="28" />
              </div>

              <h3 class="service-name mb-2">{{ service.name }}</h3>
              <p class="service-description mb-4">{{ service.description }}</p>

              <div class="d-flex align-center justify-space-between mb-4">
                <div class="d-flex align-center ga-2">
                  <v-icon size="16" color="primary">mdi-clock-outline</v-icon>
                  <span class="service-duration">{{ service.duration }} min</span>
                </div>
                <div class="service-price">
                  <span class="price-label">Desde</span>
                  <span class="price-value">${{ service.price }}</span>
                </div>
              </div>

              <v-btn
                block
                color="primary"
                variant="flat"
                rounded="lg"
                class="mt-2"
              >
                <v-icon start>mdi-calendar-plus</v-icon>
                Agendar ahora
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div class="services-cta text-center mt-12">
        <h3 class="text-h6 font-weight-bold mb-3">¿No encuentras lo que buscas?</h3>
        <p class="text-body-1 text-medium-emphasis mb-4">
          Contáctanos y te ayudaremos a encontrar el especialista ideal
        </p>
        <v-btn
          color="primary"
          variant="outlined"
          rounded="lg"
          size="large"
          prepend-icon="mdi-phone-outline"
        >
          Contactar ahora
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useServicesStore } from '@/stores/servicesStore'
import { useBookingStore } from '@/stores/bookingStore'
import { useRouter } from 'vue-router'

const servicesStore = useServicesStore()
const bookingStore = useBookingStore()
const router = useRouter()

const services = servicesStore.services

function selectService(service) {
  bookingStore.resetAll()
  bookingStore.selectService(service.name)
  router.push('/booking')
}
</script>

<style scoped>
.services-view {
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

.service-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--service-color) 0%, color-mix(in srgb, var(--service-color) 70%, #26C6DA 30%) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px color-mix(in srgb, var(--service-color) 35%, transparent 65%);
  transition: all 0.3s ease;
}

.glass-card:hover .service-icon-wrapper {
  transform: scale(1.08);
}

.service-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1f5e;
}

.service-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0;
}

.service-duration {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1f5e;
}

.service-price {
  text-align: right;
}

.price-label {
  display: block;
  font-size: 0.72rem;
  color: #9ca3af;
  text-transform: uppercase;
  font-weight: 600;
}

.price-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: #5C6BC0;
}

.services-cta {
  background: rgba(240, 242, 255, 0.6);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid rgba(92, 107, 192, 0.15);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
