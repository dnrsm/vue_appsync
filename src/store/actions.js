import * as types from "./mutation-types";
// import { AmplifyEventBus } from "aws-amplify-vue";

export const setUser = ({ commit }, val) => {
  commit(types.SET_USER, val);
};
