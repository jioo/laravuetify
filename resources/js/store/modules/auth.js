import axios from 'axios'
import Cookies from 'js-cookie'

export const state = {
  user: null,
  token: Cookies.get('token')
}

export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null,
  isAdmin: state => {
    if (state.user === null) return false
    return state.user.role.includes('admin')
  }
}

export const mutations = {
  SAVE_TOKEN (state, { token, remember }) {
    state.token = token
    Cookies.set('token', token, { expires: remember ? 365 : null })
  },

  FETCH_USER_SUCCESS (state, { user }) {
    state.user = user
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
    Cookies.remove('token')
  },

  LOGOUT (state) {
    state.user = null
    state.token = null

    Cookies.remove('token')
  },

  UPDATE_USER (state, { user }) {
    state.user = user
  }
}

export const actions = {
  SAVE_TOKEN ({ commit }, payload) {
    commit('SAVE_TOKEN', payload)
  },

  async FETCH_USER ({ commit }) {
    try {
      const { data } = await axios.get('/api/user')

      commit('FETCH_USER_SUCCESS', { user: data })
    } catch (e) {
      commit('FETCH_USER_FAILURE')
    }
  },

  UPDATE_USER ({ commit }, payload) {
    commit('UPDATE_USER', payload)
  },

  async LOGOUT ({ commit }) {
    try {
      await axios.post('/api/logout')
    } catch (e) { }

    commit('LOGOUT')
  },

  async FETCH_OAUTH_URL ({ commit }, payload) {
    const { provider } = payload
    const { data } = await axios.post(`/api/oauth/${provider}`)
    return data.url
  }
}
