import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "axios";
export default new Vuex.Store({
  state: {
    Weathers: [],
    loading: false,
    error: null
  },
  mutations: {
    setWeather(state, payload) {
      state.Weathers = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    errorMessage(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    async loadWeather({ commit }, payload) {
      commit("errorMessage", false);
      commit("setLoading", true);
      await axios
        .get(
          "http://api.weatherapi.com/v1/current.json?key=8d983a242f4e482e803121409201911&q=" +
            payload
        )
        .then(response => {
          console.log(response);
          commit("setLoading", false);
          commit("setWeather", response.data);
        })
        .catch(error => {
          console.log(error.response);
          commit("errorMessage", error.response.data.error.message);
          commit("setLoading", false);
        });
    }
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    weather(state) {
      return state.Weathers;
    },
    weatherIsEmpty(state) {
      return state.Weathers.length !== 0;
    }
  },
  modules: {}
});
