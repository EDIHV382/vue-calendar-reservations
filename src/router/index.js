import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookingView from '../views/BookingView.vue'
import ConfirmationView from '../views/ConfirmationView.vue'
import DoctorsView from '../views/DoctorsView.vue'
import ServicesView from '../views/ServicesView.vue'
import { useBookingStore } from '@/stores/bookingStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingView,
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmationView,
      beforeEnter: (to, from, next) => {
        const store = useBookingStore()
        const confirmedAppointment = store.appointments.find(
          apt => apt.status === 'confirmed'
        )
        if (!confirmedAppointment) {
          next('/booking')
        } else {
          next()
        }
      },
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: DoctorsView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
  ],
})

export default router
