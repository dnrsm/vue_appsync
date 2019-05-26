<template>
  <div>
    <h1>About</h1>
    <h1>state: {{ user }}</h1>
    <button @click="getUsername()">button</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "about",
  computed: {
    user() {
      return this.$store.state.users.user;
    },
    ...mapState(["users/user"])
  },
  mounted() {
    // console.log(this.$store.state.user);
    console.log(this.$store.state.users.user);
  },
  methods: {
    getUsername() {
      this.$store.dispatch("users/getUserInfoAction");
    }
  }
};
</script>
