<template>
  <div class="time-slot-picker">
    <div class="d-flex align-center mb-4">
      <div class="slot-header-icon">
        <v-icon color="white" size="16">mdi-clock-outline</v-icon>
      </div>
      <h4 class="slot-picker-title ml-3 mb-0">Horarios disponibles</h4>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary" size="40" width="3" />
      <p class="text-body-2 text-medium-emphasis mt-3 mb-0">Cargando horarios...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="!slots.length" class="empty-slots-state">
      <v-icon size="48" color="primary" style="opacity:0.4;">mdi-calendar-clock</v-icon>
      <p class="text-body-2 text-medium-emphasis mt-2 mb-0">
        Selecciona una fecha para ver los horarios
      </p>
    </div>

    <!-- Slots grid -->
    <template v-else>
      <div class="slots-legend d-flex align-center ga-3 mb-3">
        <div class="d-flex align-center ga-1">
          <div class="legend-dot legend-available" />
          <span class="legend-label">Disponible</span>
        </div>
        <div class="d-flex align-center ga-1">
          <div class="legend-dot legend-selected" />
          <span class="legend-label">Seleccionado</span>
        </div>
        <div class="d-flex align-center ga-1">
          <div class="legend-dot legend-occupied" />
          <span class="legend-label">Ocupado</span>
        </div>
      </div>

      <div class="slots-grid">
        <button
          v-for="slot in slots"
          :key="slot.time"
          class="slot-btn"
          :class="{
            'slot-btn--available': slot.status === 'available' && selectedTime !== slot.time,
            'slot-btn--selected': selectedTime === slot.time,
            'slot-btn--occupied': slot.status === 'occupied'
          }"
          :disabled="slot.status === 'occupied'"
          @click="selectTime(slot.time)"
        >
          <span class="slot-time">{{ slot.time }}</span>
        </button>
      </div>

      <div v-if="selectedTime" class="selected-time-display mt-4">
        <v-icon size="16" color="primary">mdi-check-circle</v-icon>
        <span class="ml-2">Hora seleccionada: <strong>{{ selectedTime }}</strong></span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { useAvailabilityStore } from '@/stores/availabilityStore'

const bookingStore = useBookingStore()
const availabilityStore = useAvailabilityStore()

const slots = computed(() => availabilityStore.slots)
const isLoading = computed(() => availabilityStore.isLoading)
const selectedTime = computed(() => bookingStore.selectedTime)

function selectTime(time) {
  bookingStore.selectTime(time)
}
</script>

<style scoped>
.time-slot-picker {
  padding: 4px 0;
}

.slot-header-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.slot-picker-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1f5e;
}

.empty-slots-state {
  text-align: center;
  padding: 32px 16px;
  background: rgba(92, 107, 192, 0.04);
  border-radius: 14px;
  border: 1.5px dashed rgba(92, 107, 192, 0.2);
}

/* Legend */
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-available { background: #5C6BC0; opacity: 0.5; }
.legend-selected { background: #5C6BC0; }
.legend-occupied { background: #bdbdbd; }
.legend-label { font-size: 0.72rem; color: #6b7280; }

/* Slots grid */
.slots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
}

@media (min-width: 380px) {
  .slots-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
}

@media (min-width: 600px) {
  .slots-grid { grid-template-columns: repeat(4, 1fr); }
}

.slot-btn {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px 6px;
  font-size: 0.83rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid transparent;
}

.slot-btn:focus-visible {
  outline: 2px solid #5C6BC0;
  outline-offset: 2px;
}

.slot-btn--available {
  border-color: rgba(92, 107, 192, 0.25);
  color: #3949AB;
  background: rgba(92, 107, 192, 0.06);
}

.slot-btn--available:hover {
  border-color: #5C6BC0;
  background: rgba(92, 107, 192, 0.12);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 107, 192, 0.2);
}

.slot-btn--selected {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 14px rgba(92, 107, 192, 0.4);
  transform: translateY(-2px);
}

.slot-btn--occupied {
  border-color: rgba(0, 0, 0, 0.08);
  color: #bdbdbd;
  background: rgba(0, 0, 0, 0.03);
  cursor: not-allowed;
  text-decoration: line-through;
}

.slot-time {
  letter-spacing: 0.3px;
}

.selected-time-display {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background: rgba(92, 107, 192, 0.08);
  border-radius: 10px;
  font-size: 0.85rem;
  color: #3949AB;
  border: 1px solid rgba(92, 107, 192, 0.2);
}
</style>
