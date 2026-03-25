import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  const appointments = ref([])
  const selectedService = ref('')
  const selectedDate = ref('')
  const selectedTime = ref('')
  const currentStep = ref(1)

  const appointmentsByDate = computed(() => {
    if (!selectedDate.value) return []
    return appointments.value.filter(apt => apt.date === selectedDate.value)
  })

  const pendingCount = computed(() => {
    return appointments.value.filter(apt => apt.status === 'pending').length
  })

  function selectService(service) {
    selectedService.value = service
    currentStep.value = 2
  }

  function selectDate(date) {
    selectedDate.value = date
  }

  function selectTime(time) {
    selectedTime.value = time
    // No avanzar automáticamente — el usuario usa el botón "Siguiente"
  }

  function confirmAppointment(patientData) {
    const appointment = {
      id: 'apt_' + Date.now(),
      service: selectedService.value,
      doctorId: 'dr_01',
      patientName: patientData.name,
      patientEmail: patientData.email,
      patientPhone: patientData.phone,
      date: selectedDate.value,
      time: selectedTime.value,
      duration: 30,
      status: 'confirmed'
    }
    appointments.value.push(appointment)
    resetSelection()
  }

  function cancelAppointment(id) {
    const index = appointments.value.findIndex(apt => apt.id === id)
    if (index !== -1) {
      appointments.value[index].status = 'cancelled'
    }
  }

  function resetSelection() {
    selectedService.value = ''
    selectedTime.value = ''
    currentStep.value = 1
    // No resetear selectedDate para que el usuario pueda usar la misma fecha
  }

  function resetAll() {
    selectedService.value = ''
    selectedDate.value = ''
    selectedTime.value = ''
    currentStep.value = 1
  }

  function goToStep(step) {
    currentStep.value = step
  }

  return {
    appointments,
    selectedService,
    selectedDate,
    selectedTime,
    currentStep,
    appointmentsByDate,
    pendingCount,
    selectService,
    selectDate,
    selectTime,
    confirmAppointment,
    cancelAppointment,
    resetSelection,
    resetAll,
    goToStep
  }
})
