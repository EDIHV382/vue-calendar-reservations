# AGENTS.md — Plataforma de Reservas

## Proyecto
SPA para agendar citas médicas. El usuario elige servicio,
selecciona fecha/horario y confirma sus datos.
Stack: Vue 3 + Vuetify 3 + Pinia + FullCalendar
Lenguaje: JavaScript (NO TypeScript)

## Comandos del proyecto
- `npm run dev` — Inicia servidor de desarrollo
- `npm run build` — Build para producción
- `npm run preview` — Preview del build
- `npm run lint` — ESLint (si está configurado)

## Reglas de código
- SIEMPRE <script setup> y Composition API
- NUNCA Options API
- Fechas en formato ISO: "2024-01-15T14:30:00"
- IDs de citas: "apt_" + Date.now()

## Estructura de carpetas
src/
├── views/                 → HomeView, BookingView, ConfirmationView
├── components/
│   ├── calendar/          → CalendarWidget.vue, TimeSlotPicker.vue
│   ├── booking/           → ServiceCard.vue, BookingForm.vue
│   └── shared/            → AppHeader.vue
├── stores/                → bookingStore.js, availabilityStore.js
├── composables/           → useBooking.js, useAvailability.js
└── router/                → index.js

## Modelo de datos — Cita
{
  id: "apt_1234",
  service: "Consulta general",
  doctorId: "dr_01",
  patientName: "Juan Pérez",
  patientEmail: "juan@email.com",
  patientPhone: "555-1234",
  date: "2024-01-15",
  time: "14:30",
  duration: 30,
  status: "pending" | "confirmed" | "cancelled"
}

## Horarios disponibles
- Lunes a viernes, 09:00 a 18:00
- Intervalos de 30 minutos
- Formato: ["09:00", "09:30", "10:00", ...]

## Flujo de reserva (v-stepper con 3 pasos)
Paso 1: Elegir servicio
Paso 2: Elegir fecha y horario
Paso 3: Ingresar datos y confirmar

## Componentes Vuetify principales
- v-stepper para el flujo de 3 pasos
- v-date-picker o FullCalendar para calendario
- v-chip para horarios (disponible/ocupado)
- v-form + v-text-field para datos del paciente
- v-dialog para confirmación final
- v-snackbar para notificaciones

## Skills en .opencode/skills/
- vue-component.md — Componentes con `<script setup>` y Composition API
- pinia-store.md — Stores con setup function syntax
- vuetify-patterns.md — Patrones de UI y variantes de componentes
- api-composable.md — Composables para llamadas HTTP/REST

## Convenciones adicionales
- Imports: usar `@/` para alias desde `src/`
- Nombres de archivos: PascalCase para componentes, camelCase para stores/composables
- Estados de carga: siempre usar `isLoading` en operaciones async
- Manejo de errores: campo `error` en stores y componentes