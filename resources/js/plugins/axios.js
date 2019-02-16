import Vue from 'vue'
import axios from 'axios'
import store from '~/store'
import router from '~/router'
import swal from 'sweetalert2'

const _axios = axios.create(config)

// Request interceptor
_axios.interceptors.request.use(request => {
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
_axios.interceptors.response.use(response => response, error => {
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

  if (status === 422) {
    let message = ''
    let object = error.response.data.errors

    for(var key in object) {
      message += `${object[key][0]}<br/>`
    }

    store.dispatch('OPEN_ALERT_MESSAGE', message)
  }

  return Promise.reject(error)
})

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
      axios: {
          get() {
              return _axios
          }
      },
      $axios: {
          get() {
              return _axios
          }
      },
  })
}

Vue.use(Plugin)
export default Plugin
