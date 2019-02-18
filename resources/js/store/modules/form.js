export const state = {
  alert: {
    show: false,
    message: '',
  }
}

export const getters = {
  alert: state => state.alert
}

export const mutations = {
  CLOSE_ALERT_MESSAGE(state) {
    state.alert = {
      show: false,
      message: '',
    }
  },

  OPEN_ALERT_MESSAGE(state, payload) {
    state.alert = {
      show: true,
      message: payload,
    }
  }
}

export const actions = {
  CLOSE_ALERT_MESSAGE ({ commit }) {
    commit('CLOSE_ALERT_MESSAGE')
  },

  OPEN_ALERT_MESSAGE ({ commit }, payload) {
    commit('OPEN_ALERT_MESSAGE', payload)
  }
}