<template>
  <v-container grid-list-md>
    <v-layout justify-center row wrap>
      <ItemForm />
      <v-flex xs12 sm12>
        <v-card>
          <v-card-title>
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >New Item</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex md12>
                      <v-text-field
                        v-model="data.image"
                        label="image"
                      ></v-text-field>
                    </v-flex>
                    <v-flex md12>
                      <v-text-field
                        v-model="data.link"
                        label="link"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="data.blank"
                        label="blank"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="data.type"
                        label="type"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="save(data)"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :search="search"
            :rows-per-page-text="rowsPerPageText"
            :rows-per-page-items="rowsPerPageItems"
            :loading="loading"
            :pagination.sync="pagination"
            select-all
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td class="text-xs-right">{{ props.index }}</td>
              <td class="text-xs-right">{{ props.item.id }}</td>
              <td class="text-xs-right">{{ props.item.image }}</td>
              <td class="text-xs-right">{{ props.item.link }}</td>
              <td class="text-xs-right">{{ props.item.blank }}</td>
              <td class="text-xs-right">{{ props.item.type }}</td>
              <td class="justify-center layout px-0">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(props.item, props.index)"
                >
                  edit
                </v-icon>
                <v-icon small @click="deleteItems(props.item.id)">
                  delete
                </v-icon>
              </td>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ItemForm from "../components/ItemForm.vue";

import { mapState, mapActions } from "vuex";
// import { constants } from "crypto";

export default {
  name: "home",
  components: {
    ItemForm
  },
  data() {
    return {
      loading: true,
      pagination: {},
      rowsPerPageText: "表示件数",
      rowsPerPageItems: [
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
        5,
        10,
        25
      ],
      dialog: false,
      search: "",
      selected: [],
      headers: [
        { text: "index", value: "index" },
        { text: "id", value: "id" },
        { text: "image", value: "image" },
        { text: "link", value: "link" },
        { text: "blank", value: "blank" },
        { text: "type", value: "type" },
        { text: "Actions", value: "name", sortable: false }
      ],
      data: {
        image: "",
        link: "",
        blank: "",
        type: ""
      },
      tasks: [],
      editedIndex: -1
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    items() {
      return this.$store.state.crud.items;
    },
    ...mapState(["crud/items"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    pagination: {
      handler() {
        this.getDataFromApi().then(data => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true
    }
  },
  methods: {
    editItem(item, index) {
      this.editedIndex = index;
      this.data = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.data = {};
        this.editedIndex = -1;
      }, 300);
    },
    async save(data) {
      if (this.editedIndex > -1) {
        await this.updateItems(data);
      } else {
        await this.createItems();
      }
      this.close();
    },
    async createItems() {
      await this.$store.dispatch(
        "crud/createItems",
        JSON.parse(JSON.stringify(this.data))
      );
      this.data = "";
      this.dialog = false;
      await this.$store.dispatch("crud/getItems");
      this.close();
    },
    async updateItems(data) {
      await this.$store.dispatch("crud/updateItems", data);
      await this.$store.dispatch("crud/getItems");
    },
    async deleteItems(id) {
      let confirm_result = confirm("削除しますか？");
      if (confirm_result) {
        await this.$store.dispatch("crud/deleteItems", id);
        await this.$store.dispatch("crud/getItems");
      }
    },
    ...mapActions(["crud/getItems", "crud/updateItems", "crud/deleteItems"]),
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, rowsPerPage } = this.pagination;

        let items = this.items;
        const total = items.length;

        if (this.pagination.sortBy) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) {
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }

        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 1000);
      });
    }
  },
  async mounted() {
    this.$store.dispatch("crud/getItems");
    this.getDataFromApi().then(data => {
      this.desserts = data.items;
      this.totalDesserts = data.total;
    });
  }
};
</script>
