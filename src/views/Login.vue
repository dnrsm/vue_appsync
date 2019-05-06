<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4 text-xs-center>
        <amplify-authenticator></amplify-authenticator>
        <div class="login-form">
          <p>ログイン</p>
          <p>{{ status }}</p>
          <p>{{ message_text }}</p>
          <label>ユーザー名</label>
          <input type="text" v-model="userInfo.username" />
          <label>パスワード</label>
          <input type="password" v-model="userInfo.password" />
          <button class="btn btn-primary" @click="signIn()">ログイン</button>
          <button class="btn btn-primary" @click="signOut()">ログアウト</button>
          <img :src="url" />
        </div>
        <div class="login-form">
          <p>サインアップ</p>
          <label>ユーザー名</label>
          <input type="text" v-model="userInfo.username" />
          <label>パスワード</label>
          <input type="password" v-model="userInfo.password" />
          <button class="btn btn-primary" @click="signUp()">
            サインアップ
          </button>
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
      .then(() => {
        this.status = "ログインしています";
      })
      .catch(() => {
        this.status = "ログインしていません";
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
