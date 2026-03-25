import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAvailabilityStore } from '@/stores/availabilityStore'

describe('availabilityStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('inicializa con estado vacío', () => {
    const store = useAvailabilityStore()
    expect(store.slots).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.currentDate).toBeNull()
  })

  it('genera horarios correctamente de 09:00 a 18:00', async () => {
    const store = useAvailabilityStore()
    await store.loadAvailability('2024-01-15')

    expect(store.slots.length).toBe(19)
    expect(store.slots[0].time).toBe('09:00')
    expect(store.slots[store.slots.length - 1].time).toBe('18:00')
  })

  it('marca algunos horarios como ocupados', async () => {
    const store = useAvailabilityStore()
    await store.loadAvailability('2024-01-15')

    expect(store.slots.length).toBeGreaterThan(0)
    const occupied = store.slots.filter(s => s.status === 'occupied')
    const available = store.slots.filter(s => s.status === 'available')

    expect(occupied.length).toBeLessThan(store.slots.length)
    expect(available.length).toBeGreaterThan(0)
  })
})
