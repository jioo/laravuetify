export const state = {
  drawer: true,
  isLoading: false,
}

export const getters = {
  drawer: state => state.drawer, 
  isLoading: state => state.isLoading
}

export const mutations = {
  TOGGLE_DRAWER(state) {
    state.drawer = !state.drawer
  },

  UPDATE_DRAWER(state, payload) {
    state.drawer = payload
  },

  LOADING_START (state) {
    state.isLoading = true
  },

  LOADING_END (state) {
    state.isLoading = false
  }
}

export const actions = {
  TOGGLE_DRAWER({ commit }) {
    commit('TOGGLE_DRAWER')
  },

  UPDATE_DRAWER({commit}, payload) {
    commit('UPDATE_DRAWER', payload)
  },

  LOADING_START ({commit}) {
    commit('LOADING_START')
  },

  LOADING_END ({commit}) {
    commit('LOADING_END')
  }
}