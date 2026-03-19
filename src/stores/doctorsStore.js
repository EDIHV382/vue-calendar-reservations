import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDoctorsStore = defineStore('doctors', () => {
  const doctors = ref([
    {
      id: 'dr_01',
      name: 'Dr. García Hernández',
      specialty: 'Medicina General',
      description: 'Especialista en medicina interna con 15 años de experiencia',
      icon: 'mdi-account',
      color: '#5C6BC0',
      available: true,
      rating: 4.8
    },
    {
      id: 'dr_02',
      name: 'Dra. Martínez López',
      specialty: 'Cardiología',
      description: 'Cardióloga certificada, experta en prevención cardiovascular',
      icon: 'mdi-heart-pulse',
      color: '#E53935',
      available: true,
      rating: 4.9
    },
    {
      id: 'dr_03',
      name: 'Dr. Romero Silva',
      specialty: 'Pediatría',
      description: 'Pediatra con subespecialidad en neonatología',
      icon: 'mdi-baby',
      color: '#FF7043',
      available: true,
      rating: 4.7
    },
    {
      id: 'dr_04',
      name: 'Dra. Fernández Costa',
      specialty: 'Dermatología',
      description: 'Dermatóloga estética y clínica',
      icon: 'mdi-face-man-shimmer',
      color: '#8E24AA',
      available: false,
      rating: 4.6
    },
    {
      id: 'dr_05',
      name: 'Dr. Jiménez Ruiz',
      specialty: 'Traumatología',
      description: 'Traumatólogo experto en cirugía articular',
      icon: 'mdi-bone',
      color: '#00897B',
      available: true,
      rating: 4.8
    },
    {
      id: 'dr_06',
      name: 'Dra. Vargas Méndez',
      specialty: 'Ginecología',
      description: 'Ginecóloga obstetra con enfoque en salud femenina',
      icon: 'mdi-gender-female',
      color: '#EC407A',
      available: true,
      rating: 4.9
    }
  ])

  const availableDoctors = computed(() => {
    return doctors.value.filter(d => d.available)
  })

  const doctorsBySpecialty = computed(() => {
    return (specialty) => doctors.value.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()))
  })

  function getDoctorById(id) {
    return doctors.value.find(d => d.id === id)
  }

  return {
    doctors,
    availableDoctors,
    doctorsBySpecialty,
    getDoctorById
  }
})
