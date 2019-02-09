import store from '~/store'

export default async (to, from, next) => {
  if (!store.getters['check'] && store.getters['token']) {
    try {
      await store.dispatch('fetchUser')
    } catch (e) { }
  }

  next()
}
