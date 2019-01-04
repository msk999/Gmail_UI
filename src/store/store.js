import Vue from "vue";
import Vuex from "vuex";
import * as auth from "@/store/modules/auth";
import * as event from "@/store/modules/event";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    event
  },
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
});
