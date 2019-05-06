<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4 text-xs-center>
        <amplify-authenticator></amplify-authenticator>
        <div class="login-form">
          <p>status: {{ status }}</p>
          <p>message_text: {{ message_text }}</p>
          <v-text-field
            label="username"
            type="text"
            v-model="userInfo.username"
          ></v-text-field>
          <v-text-field
            label="pass"
            type="password"
            v-model="userInfo.password"
          ></v-text-field>
          <v-btn v-if="status == 'logout'" color="primary" @click="signIn()"
            >ログイン</v-btn
          >
          <v-btn v-if="status == 'login'" color="primary" @click="signOut()"
            >ログアウト</v-btn
          >
          <img :src="url" />
        </div>
        <div class="login-form">
          <v-text-field
            label="username"
            type="text"
            v-model="userInfo.username"
          ></v-text-field>
          <v-text-field
            label="pass"
            type="password"
            v-model="userInfo.password"
          ></v-text-field>
          <v-btn color="primary" @click="signUp()">サインアップ</v-btn>
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
      status: "",
      userInfo: {
        username: "",
        password: ""
      },
      message_text: "",
      url: ""
    };
  },
  created() {
    Auth.currentSession()
      .then(data => {
        console.log(data);
        this.status = "login";
      })
      .catch(error => {
        console.log(error);
        this.status = "logout";
      });
  },
  methods: {
    signUp: function() {
      Auth.signUp(this.userInfo.username, this.userInfo.password)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    },
    signIn: function() {
      Auth.signIn(this.userInfo.username, this.userInfo.password)
        .then(data => {
          this.message_text = "ログインしました";
          this.status = "こんにちは、" + data.username + "さん";
        })
        .catch(() => {
          this.message_text = "ログインできませんでした";
        });
    },
    signOut: function() {
      Auth.signOut()
        .then(() => {
          this.message_text = "ログアウトしました";
        })
        .catch(() => {
          this.message_text = "ログアウトできませんでした";
        });
    }
  }
};
</script>
