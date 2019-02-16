export const state = {
  drawer: true,
}

export const getters = {
  drawer: state => state.drawer
}

export const mutations = {
  TOGGLE_DRAWER(state) {
    state.drawer = !state.drawer
  },

  UPDATE_DRAWER(state, payload) {
    state.drawer = payload
  },
}

export const actions = {
  TOGGLE_DRAWER({ commit }) {
    commit('TOGGLE_DRAWER')
  },

  UPDATE_DRAWER({commit}, payload) {
    commit('UPDATE_DRAWER', payload)
  },
}