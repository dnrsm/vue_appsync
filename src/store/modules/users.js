import { Auth } from "aws-amplify";

export default {
  namespaced: true,
  state: {
    user: null,
    email: null
  },
  actions: {
    async getUserInfoAction({ commit }) {
      const userData = await Auth.currentUserInfo()
        .then(data => data)
        .catch(err => console.log(err));
      commit("getUserInfo", userData);
    }
  },
  mutations: {
    getUserInfo(state, val) {
      state.user = val.username;
      state.email = val.attributes.email;
    }
  },
  getters: {}
};
