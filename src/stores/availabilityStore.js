import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAvailabilityStore = defineStore('availability', () => {
  const slots = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const currentDate = ref(null)

  function generateTimeSlots() {
    const times = []
    let hour = 9
    let minute = 0
    while (hour < 18 || (hour === 18 && minute === 0)) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      times.push({
        time,
        status: 'available'
      })
      minute += 30
      if (minute === 60) {
        minute = 0
        hour++
      }
    }
    return times
  }

  async function loadAvailability(date) {
    isLoading.value = true
    error.value = null
    currentDate.value = date
    try {
      const baseSlots = generateTimeSlots()
      const occupiedIndices = []
      const numOccupied = Math.floor(Math.random() * 5)
      while (occupiedIndices.length < numOccupied) {
        const idx = Math.floor(Math.random() * baseSlots.length)
        if (!occupiedIndices.includes(idx)) {
          occupiedIndices.push(idx)
        }
      }
      baseSlots.forEach((slot, idx) => {
        if (occupiedIndices.includes(idx)) {
          slot.status = 'occupied'
        }
      })
      slots.value = baseSlots
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const availableSlots = computed(() => {
    return slots.value.filter(slot => slot.status === 'available')
  })

  const occupiedSlots = computed(() => {
    return slots.value.filter(slot => slot.status === 'occupied')
  })

  function isSlotAvailable(time) {
    return slots.value.some(slot => slot.time === time && slot.status === 'available')
  }

  return {
    slots,
    isLoading,
    error,
    currentDate,
    availableSlots,
    occupiedSlots,
    loadAvailability,
    isSlotAvailable
  }
})
