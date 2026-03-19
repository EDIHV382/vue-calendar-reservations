# Skill: API Composable

## Patrón para llamadas REST
import { ref } from 'vue'

export function useApi(baseUrl) {
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function fetch(endpoint) {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(`${baseUrl}${endpoint}`)
      if (!res.ok) throw new Error(res.statusText)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  async function post(endpoint, body) {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error(res.statusText)
      data.value = await res.json()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, fetch, post }
}

Reglas:
- Nombre siempre empieza con "use"
- Retornar refs: data, isLoading, error
- Siempre manejar errores con try/catch
- Resetear error antes de cada llamada