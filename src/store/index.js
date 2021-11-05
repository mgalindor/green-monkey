import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locale: "es",
  },
  getters: {
    getLocale: (state) => {
      return navigator.language || navigator.userLanguage || state.locale;
    },

    getDateTimeISO: () => (date) => {
      const offsetMs = date.getTimezoneOffset() * 60 * 1000;
      const msLocal = date.getTime() - offsetMs;
      const dateLocal = new Date(msLocal);
      const iso = dateLocal.toISOString();
      const isoLocal = iso.slice(0, 19);
      return isoLocal;
    },
    getDateISO: (state, getters) => (date) => {
      return getters.getDateTimeISO(date).slice(0, 10);
    },
    getToday: (state, getters) => {
      return getters.getDateISO(new Date());
    },
    getTomorrow: (state, getters) => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return getters.getDateISO(tomorrow);
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
