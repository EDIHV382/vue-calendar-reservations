import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBookingStore } from '@/stores/bookingStore'

describe('bookingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicializa con estado vacío', () => {
    const store = useBookingStore()
    expect(store.appointments).toEqual([])
    expect(store.selectedService).toBe('')
    expect(store.selectedDate).toBe('')
    expect(store.selectedTime).toBe('')
    expect(store.currentStep).toBe(1)
  })

  it('selecciona un servicio correctamente', () => {
    const store = useBookingStore()
    store.selectService('Consulta general')
    expect(store.selectedService).toBe('Consulta general')
    expect(store.currentStep).toBe(2)
  })

  it('selecciona fecha y hora', () => {
    const store = useBookingStore()
    store.selectDate('2024-01-15')
    store.selectTime('14:30')
    expect(store.selectedDate).toBe('2024-01-15')
    expect(store.selectedTime).toBe('14:30')
    expect(store.currentStep).toBe(3)
  })

  it('confirma una cita con datos correctos', () => {
    const store = useBookingStore()
    store.selectService('Consulta general')
    store.selectDate('2024-01-15')
    store.selectTime('14:30')

    store.confirmAppointment({
      name: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '555-1234'
    })

    expect(store.appointments.length).toBe(1)
    expect(store.appointments[0].service).toBe('Consulta general')
    expect(store.appointments[0].patientName).toBe('Juan Pérez')
    expect(store.appointments[0].status).toBe('confirmed')
    expect(store.appointments[0].id).toMatch(/^apt_/)
  })

  it('resetSelection no borla la fecha seleccionada', () => {
    const store = useBookingStore()
    store.selectDate('2024-01-15')
    store.selectTime('14:30')
    store.selectService('Consulta general')

    store.resetSelection()

    expect(store.selectedService).toBe('')
    expect(store.selectedTime).toBe('')
    expect(store.currentStep).toBe(1)
    expect(store.selectedDate).toBe('2024-01-15') // La fecha se mantiene
  })

  it('cancela una cita correctamente', () => {
    const store = useBookingStore()
    store.confirmAppointment({
      name: 'Test User',
      email: 'test@email.com',
      phone: '555-0000'
    })

    const appointmentId = store.appointments[0].id
    store.cancelAppointment(appointmentId)

    expect(store.appointments[0].status).toBe('cancelled')
  })

  it('calcula appointmentsByDate correctamente', () => {
    const store = useBookingStore()
    store.selectDate('2024-01-15')

    store.confirmAppointment({
      name: 'Test 1',
      email: 'test1@email.com',
      phone: '555-0001'
    })

    store.confirmAppointment({
      name: 'Test 2',
      email: 'test2@email.com',
      phone: '555-0002'
    })

    // Segunda cita en otra fecha
    store.selectDate('2024-01-16')
    store.confirmAppointment({
      name: 'Test 3',
      email: 'test3@email.com',
      phone: '555-0003'
    })

    store.selectDate('2024-01-15')
    const appointmentsByDate = store.appointments.filter(apt => apt.date === '2024-01-15')
    expect(appointmentsByDate.length).toBe(2)
  })

  it('calcula pendingCount correctamente', () => {
    const store = useBookingStore()

    store.confirmAppointment({
      name: 'Test 1',
      email: 'test1@email.com',
      phone: '555-0001'
    })

    store.appointments[0].status = 'pending'

    const pendingCount = store.appointments.filter(apt => apt.status === 'pending').length
    expect(pendingCount).toBe(1)
  })
})
