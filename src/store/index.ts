import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: null,
    user: {}
  };
};

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: getDefaultState(),
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    login: ({commit, dispatch}, {token, user}) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    logout: ({commit}) => {
      commit('RESET', '');
      sessionStorage.clear();
    }
  },
  modules: {},
  getters: {
    getUser: state => () => {
      return state.user
    },
    IsLoggedIn: state => () => {
      return state.token;
    },
    GetUserToken: state => () => {
      return state.token;
    }
  }
});
