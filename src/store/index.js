import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";
import state from "./state";

import users from "./modules/users";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    users
  },
  actions,
  getters,
  state,
  mutations
});

export default store;
