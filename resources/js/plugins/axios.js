import axios from 'axios'
import store from '~/store'
import router from '~/router'
import swal from 'sweetalert2'

// Request interceptor
axios.interceptors.request.use(request => {
  const 
    token = store.getters['token'],
    csrfToken = document.head.querySelector('meta[name="csrf-token"]')

  if (token)
    request.headers.common['Authorization'] = `Bearer ${token}`
  
  request.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  request.headers.common['X-CSRF-TOKEN'] = csrfToken.content

  // request.headers['X-Socket-Id'] = Echo.socketId()

  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  console.log(error)
  const { status } = error.response

  if (status >= 500) {
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Please try again.',
      reverseButtons: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    })
  }

  if (status === 401 && store.getters['check']) {
    swal({
      type: 'warning',
      title: 'Session Expired!',
      text: 'Please log in again to continue.',
      reverseButtons: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then(() => {
      store.commit('LOGOUT')

      router.push({ name: 'login' })
    })
  }

  return Promise.reject(error)
})
