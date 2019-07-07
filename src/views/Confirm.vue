<template>
  <v-container grid-list-md>
    <v-layout justify-center row wrap>
      <v-flex xs4 text-xs-center>
        <div class="login-form">
          <v-text-field
            label="username"
            type="text"
            v-model="userInfo.username"
          ></v-text-field>
          <v-text-field
            label="confirm"
            type="password"
            v-model="userInfo.password"
          ></v-text-field>
          <v-btn color="primary" @click="confirm()">confirm</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Amplify, { Auth } from "aws-amplify";
import aws_exports from "../aws-exports";
Amplify.configure(aws_exports);

export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      message_text: ""
    };
  },
  methods: {
    confirm () {
      Auth.confirmSignUp(this.userInfo.username, this.userInfo.password)
        .then(data => {
          this.message_text = "確認しました";
          console.log(data)
          this.$router.replace('/')
        })
        .catch(err => {
          this.message_text = err.message;
          console.log(data)
        });
    }
  }
};
</script>
