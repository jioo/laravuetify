import store from '~/store'

export default (to, from, next) => {
  if (store.getters['check']) {
    next({ path: '/dashboard' })
  } else {
    next()
  }
}
