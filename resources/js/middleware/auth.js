import store from '~/store'

export default async (to, from, next) => {
  if (!store.getters['check']) {
    next({ path: '/login' })
  } else {
    next()
  }
}