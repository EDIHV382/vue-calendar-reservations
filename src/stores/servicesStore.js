import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useServicesStore = defineStore('services', () => {
  const services = ref([
    {
      id: 'svc_1',
      name: 'Consulta General',
      description: 'Evaluación médica completa con diagnóstico y tratamiento personalizado',
      duration: 30,
      price: 500,
      icon: 'mdi-stethoscope',
      color: '#5C6BC0'
    },
    {
      id: 'svc_2',
      name: 'Cardiología',
      description: 'Chequeo cardiovascular avanzado con electrocardiograma incluido',
      duration: 45,
      price: 800,
      icon: 'mdi-heart-pulse',
      color: '#E53935'
    },
    {
      id: 'svc_3',
      name: 'Pediatría',
      description: 'Cuidado especializado para los más pequeños de la familia',
      duration: 40,
      price: 600,
      icon: 'mdi-baby',
      color: '#FF7043'
    },
    {
      id: 'svc_4',
      name: 'Dermatología',
      description: 'Diagnóstico y tratamiento de afecciones de la piel',
      duration: 35,
      price: 700,
      icon: 'mdi-face-man-shimmer',
      color: '#8E24AA'
    },
    {
      id: 'svc_5',
      name: 'Traumatología',
      description: 'Diagnóstico y tratamiento de lesiones óseas y musculares',
      duration: 40,
      price: 750,
      icon: 'mdi-bone',
      color: '#00897B'
    },
    {
      id: 'svc_6',
      name: 'Ginecología',
      description: 'Consulta ginecológica completa con ultrasonido',
      duration: 45,
      price: 850,
      icon: 'mdi-gender-female',
      color: '#EC407A'
    },
    {
      id: 'svc_7',
      name: 'Laboratorio',
      description: 'Análisis clínicos completos con resultados en línea',
      duration: 20,
      price: 300,
      icon: 'mdi-test-tube',
      color: '#00ACC1'
    },
    {
      id: 'svc_8',
      name: 'Vacunación',
      description: 'Esquemas de vacunación para todas las edades',
      duration: 15,
      price: 200,
      icon: 'mdi-needle',
      color: '#1E88E5'
    },
    {
      id: 'svc_9',
      name: 'Ultrasonido',
      description: 'Estudios de ultrasonido con equipo de alta resolución',
      duration: 30,
      price: 650,
      icon: 'mdi-image-multiple',
      color: '#9C27B0'
    },
    {
      id: 'svc_10',
      name: 'Electrocardiograma',
      description: 'Registro de la actividad eléctrica del corazón',
      duration: 25,
      price: 400,
      icon: 'mdi-pulse',
      color: '#F44336'
    }
  ])

  function getServiceById(id) {
    return services.value.find(s => s.id === id)
  }

  function getServicesByDuration(maxDuration) {
    return services.value.filter(s => s.duration <= maxDuration)
  }

  return {
    services,
    getServiceById,
    getServicesByDuration
  }
})
