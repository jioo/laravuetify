import store from '~/store'

export default (to, from, next) => {
  if (!store.getters['user'].role.includes('admin')) {
    next({ path: '/dashboard' })
  } else {
    next()
  }
}
