import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { md3 } from 'vuetify/blueprints'
import { es } from 'vuetify/locale'

const medicalTheme = {
  dark: false,
  colors: {
    primary: '#1976D2',
    'primary-darken-1': '#1565C0',
    'primary-lighten-1': '#42A5F5',
    secondary: '#424242',
    accent: '#82B1FF',
    surface: '#FFFFFF',
    background: '#F5F7FA',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#FF5252',
    info: '#2196F3',
    'on-primary': '#FFFFFF',
    'on-surface': '#000000',
  }
}

export default createVuetify({
  blueprint: md3,
  locale: {
    locale: 'es',
    messages: { es }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  theme: {
    defaultTheme: 'medicalTheme',
    themes: { medicalTheme }
  },
  defaults: {
    VCard: {
      rounded: 'xl',
      elevation: 2
    },
    VBtn: {
      rounded: 'lg',
      variant: 'flat'
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
      color: 'primary'
    },
    VChip: {
      rounded: 'lg'
    },
    VAlert: {
      variant: 'tonal',
      rounded: 'lg',
      border: 'start'
    },
    VStepper: {
      rounded: 'lg'
    },
    VDatePicker: {
      color: 'primary',
      rounded: 'lg'
    }
  }
})
