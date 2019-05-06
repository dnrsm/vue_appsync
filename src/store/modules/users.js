import { Auth } from "aws-amplify";

export default {
  namespaced: true,
  state: { user: null },
  actions: {
    async getUserInfoAction({ commit }) {
      const userData = await Auth.currentUserInfo()
        .then(data => data.username)
        .catch(err => console.log(err));
      console.log(userData);
      commit("getUserInfo", userData);
    }
  },
  mutations: {
    getUserInfo(state, val) {
      console.log(val);
      state.user = val;
    }
  },
  getters: {}
};
