import store from '~/store'

export default (to, from, next) => {
  if (store.getters['check']) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
}
