<template>
  <v-card
    class="service-card glass-card cursor-pointer"
    elevation="0"
    :class="{ 'service-card--selected': isSelected }"
    @click="$emit('selected', id)"
  >
    <v-card-text class="pa-5">
      <!-- Selection check -->
      <div class="selection-indicator" v-if="isSelected">
        <v-icon size="16" color="white">mdi-check</v-icon>
      </div>

      <!-- Icon -->
      <div class="service-card-icon mb-4" :style="{ '--svc-color': iconColor }">
        <v-icon :icon="icon" color="white" size="26" />
      </div>

      <!-- Name -->
      <h3 class="service-card-name mb-1">{{ nombre }}</h3>
      <p class="service-card-desc mb-4">{{ descripcion }}</p>

      <div class="d-flex align-center justify-space-between">
        <v-chip
          size="small"
          :color="isSelected ? 'primary' : 'default'"
          :variant="isSelected ? 'flat' : 'tonal'"
          class="font-weight-medium"
        >
          <v-icon start size="12">mdi-clock-outline</v-icon>
          {{ duracion }} min
        </v-chip>
        <v-icon
          size="18"
          :color="isSelected ? 'primary' : 'grey-lighten-1'"
          class="select-arrow-icon"
        >
          {{ isSelected ? 'mdi-check-circle' : 'mdi-arrow-right-circle-outline' }}
        </v-icon>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'

const props = defineProps({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  duracion: { type: Number, required: true },
  icon: { type: String, required: true }
})

defineEmits(['selected'])

const bookingStore = useBookingStore()

const isSelected = computed(() => bookingStore.selectedService === props.nombre)

const iconColorMap = {
  'mdi-stethoscope': '#5C6BC0',
  'mdi-baby': '#FF7043',
  'mdi-heart-pulse': '#E53935',
  'mdi-face-man-shimmer': '#8E24AA',
  'mdi-face': '#8E24AA',
  'mdi-test-tube': '#00897B',
  'mdi-needle': '#1E88E5',
  'mdi-syringe': '#1E88E5',
  'mdi-bone': '#00897B',
  'mdi-gender-female': '#EC407A',
  'mdi-image-multiple': '#9C27B0',
  'mdi-pulse': '#F44336',
}

const iconColor = computed(() => iconColorMap[props.icon] || '#5C6BC0')
</script>

<style scoped>
.service-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid rgba(92, 107, 192, 0.12) !important;
  position: relative;
  height: 100%;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 35px rgba(92, 107, 192, 0.18) !important;
  border-color: rgba(92, 107, 192, 0.3) !important;
}

.service-card--selected {
  border-color: rgba(92, 107, 192, 0.6) !important;
  background: linear-gradient(135deg, rgba(92, 107, 192, 0.05) 0%, rgba(38, 198, 218, 0.05) 100%) !important;
  box-shadow: 0 8px 28px rgba(92, 107, 192, 0.22) !important;
}

.selection-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(92, 107, 192, 0.4);
  animation: pop-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop-in {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.service-card-icon {
  width: 54px;
  height: 54px;
  border-radius: 15px;
  background: linear-gradient(135deg, var(--svc-color) 0%, color-mix(in srgb, var(--svc-color) 70%, #26C6DA 30%) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 14px color-mix(in srgb, var(--svc-color) 35%, transparent 65%);
  transition: all 0.3s ease;
}

.service-card:hover .service-card-icon {
  transform: scale(1.08);
}

.service-card-name {
  font-size: 0.98rem;
  font-weight: 700;
  color: #1a1f5e;
}

.service-card-desc {
  font-size: 0.82rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 0;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
