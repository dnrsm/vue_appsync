<template>
  <v-layout justify-center row wrap>
    <v-flex xs12 sm8>
      <form>
        <v-text-field
          v-model="data.image"
          :error-messages="imageErrors"
          :counter="10"
          label="image"
          required
          @input="$v.data.image.$touch()"
          @blur="$v.data.image.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="data.link"
          :error-messages="linkErrors"
          :counter="10"
          label="link"
          required
          @input="$v.data.link.$touch()"
          @blur="$v.data.link.$touch()"
        ></v-text-field>
        <v-select
          v-model="data.blank"
          :items="items"
          :error-messages="blankErrors"
          label="blank"
          required
          @change="$v.data.blank.$touch()"
          @blur="$v.data.blank.$touch()"
        ></v-select>
        <v-text-field
          v-model="data.type"
          :error-messages="typeErrors"
          :counter="10"
          label="type"
          required
          @input="$v.data.type.$touch()"
          @blur="$v.data.type.$touch()"
        ></v-text-field>
        <v-flex xs6 sm4>
          <v-btn @click="createItems">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-flex>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import itemService from "../services/itemService";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "FromComp",
  mixins: [validationMixin],
  validations: {
    data: {
      image: { required, maxLength: maxLength(10) },
      link: { required, maxLength: maxLength(10) },
      type: { required, maxLength: maxLength(10) },
      blank: { required }
    }
  },
  data: () => ({
    data: {
      image: "",
      link: "",
      blank: null,
      type: ""
    },
    items: ["on", "off"]
  }),
  computed: {
    imageErrors() {
      const errors = [];
      if (!this.$v.data.image.$dirty) return errors;
      !this.$v.data.image.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.data.image.required && errors.push("image is required.");
      return errors;
    },
    linkErrors() {
      const errors = [];
      if (!this.$v.data.link.$dirty) return errors;
      !this.$v.data.link.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.data.link.required && errors.push("link is required.");
      return errors;
    },
    blankErrors() {
      const errors = [];
      if (!this.$v.data.blank.$dirty) return errors;
      !this.$v.data.blank.required && errors.push("blank is required");
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.data.type.$dirty) return errors;
      !this.$v.data.type.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.data.type.required && errors.push("type is required.");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.data.image = "";
      this.data.link = "";
      this.data.blank = null;
      this.data.type = "";
    },
    async createItems() {
      await itemService.createItems(JSON.parse(JSON.stringify(this.data)));
      await console.log("success");
      await this.clear();
      // this.dialog = false;
      // this.tasks = await itemService.getItems();
      // this.close();
    }
  }
};
</script>
