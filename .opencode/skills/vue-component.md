# Skill: Vue Component

Estructura OBLIGATORIA para todos los componentes:

<template>
  <!-- HTML aquí -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  titulo: String,
  valor: { type: Number, default: 0 }
})

const emit = defineEmits(['cambio'])
const estado = ref('normal')

const claseColor = computed(() => {
  return estado.value === 'critical' ? 'text-error' : 'text-success'
})
</script>

<style scoped>
/* Solo lo que Vuetify no puede resolver */
</style>

Reglas:
- NUNCA Options API
- SIEMPRE <script setup>
- Props y emits siempre explícitos
- Usar @/ para imports desde src/