import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import appSyncConfig from "./AppSync";
// import Amplify from "aws-amplify";

import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
// import aws_exports from "./aws-exports";

Vue.use(AmplifyPlugin, AmplifyModules);

const amplifyConfig = {
  aws_appsync_graphqlEndpoint: appSyncConfig.graphqlEndpoint,
  aws_appsync_region: appSyncConfig.region,
  aws_appsync_authenticationType: appSyncConfig.authenticationType,
  aws_appsync_apiKey: appSyncConfig.apiKey,
  Auth: {
    // フェデレーションアイデンティティのID
    identityPoolId: "us-east-1:6293d6d6-a3ef-4a62-b993-f5645c26147d",
    // リージョン
    region: "us-east-1",
    // ユーザープールのID
    userPoolId: "us-east-1_0OjYkHQ2L",
    // ユーザープールのウェブクライアントID
    userPoolWebClientId: "2t3qgn8rmtujop5k6jqr3587og",
    mandatorySignIn: true
  }
};
Amplify.configure(amplifyConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
