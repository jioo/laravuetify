import store from '~/store'

export default async (to, from, next) => {
  if (!store.getters['check'] && store.getters['auth/token']) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (e) { }
  }

  next()
}
