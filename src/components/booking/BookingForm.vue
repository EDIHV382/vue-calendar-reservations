<template>
  <v-form ref="formRef" @submit.prevent="submit" class="booking-form">
    <div class="form-section-title d-flex align-center mb-5">
      <div class="form-title-icon mr-3">
        <v-icon color="white" size="18">mdi-account-edit</v-icon>
      </div>
      <h4 class="mb-0" style="font-size:0.95rem; font-weight:700; color:#1a1f5e;">Tus datos personales</h4>
    </div>

    <v-text-field
      v-model="formData.name"
      label="Nombre completo"
      :rules="[v => !!v || 'El nombre es requerido']"
      variant="outlined"
      density="comfortable"
      rounded="lg"
      prepend-inner-icon="mdi-account-outline"
      color="primary"
      class="mb-1"
    />

    <v-text-field
      v-model="formData.email"
      label="Correo electrónico"
      :rules="[
        v => !!v || 'El email es requerido',
        v => /.+@.+\..+/.test(v) || 'Email inválido'
      ]"
      variant="outlined"
      density="comfortable"
      rounded="lg"
      prepend-inner-icon="mdi-email-outline"
      type="email"
      color="primary"
      class="mb-1"
      hint="Te enviaremos la confirmación aquí"
      persistent-hint
    />

    <v-text-field
      v-model="formData.phone"
      label="Teléfono"
      :rules="[
        v => !!v || 'El teléfono es requerido',
        v => v.length >= 7 || 'Mínimo 7 dígitos'
      ]"
      variant="outlined"
      density="comfortable"
      rounded="lg"
      prepend-inner-icon="mdi-phone-outline"
      type="tel"
      color="primary"
      class="mb-4"
    />

    <v-btn
      type="submit"
      class="confirm-btn mt-2"
      size="large"
      :loading="isSubmitting"
      block
    >
      <v-icon start>mdi-check-decagram</v-icon>
      Confirmar cita
    </v-btn>

    <!-- Success -->
    <v-alert
      v-if="successMessage"
      type="success"
      variant="tonal"
      rounded="lg"
      class="mt-4"
      border="start"
    >
      <template #prepend>
        <v-icon color="success">mdi-check-circle</v-icon>
      </template>
      {{ successMessage }}
    </v-alert>

    <!-- Error -->
    <v-alert
      v-if="errorMessage"
      type="error"
      variant="tonal"
      rounded="lg"
      class="mt-4"
      border="start"
    >
      <template #prepend>
        <v-icon color="error">mdi-alert-circle</v-icon>
      </template>
      {{ errorMessage }}
    </v-alert>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useBookingStore } from '@/stores/bookingStore'
import { useRouter } from 'vue-router'

const bookingStore = useBookingStore()
const router = useRouter()

const formRef = ref(null)
const isSubmitting = ref(false)
const successMessage = ref(null)
const errorMessage = ref(null)

const formData = ref({
  name: '',
  email: '',
  phone: ''
})

async function submit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  isSubmitting.value = true
  successMessage.value = null
  errorMessage.value = null

  try {
    await new Promise(resolve => setTimeout(resolve, 800))
    bookingStore.confirmAppointment({
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone
    })
    successMessage.value = '¡Cita confirmada!'
    formData.value = { name: '', email: '', phone: '' }
    setTimeout(() => {
      router.push('/confirmation')
    }, 1000)
  } catch (e) {
    errorMessage.value = 'Error al confirmar la cita. Intente nuevamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.booking-form {
  width: 100%;
}

.form-title-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.confirm-btn {
  background: linear-gradient(135deg, #5C6BC0 0%, #26C6DA 100%) !important;
  color: white !important;
  border-radius: 12px !important;
  font-weight: 700 !important;
  font-size: 0.95rem !important;
  letter-spacing: 0 !important;
  box-shadow: 0 6px 18px rgba(92, 107, 192, 0.4) !important;
  transition: all 0.3s ease !important;
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(92, 107, 192, 0.5) !important;
}
</style>
