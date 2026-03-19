# Skill: Pinia Store

Patrón obligatorio para todos los stores:

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNombreStore = defineStore('nombre', () => {
  const items = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const total = computed(() => items.value.length)

  async function fetchData() {
    isLoading.value = true
    try {
      const res = await fetch('/api/data')
      items.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return { items, isLoading, error, total, fetchData }
})

Reglas:
- Setup syntax (función arrow), no objeto
- Siempre retornar todo lo que usan los componentes
- isLoading + error en stores con fetch