import { API, graphqlOperation } from "aws-amplify";

export default {
  namespaced: true,
  state: {
    items: []
  },
  actions: {
    async getItems({ commit }) {
      const listTasks = `query listMyModelTypes {
        listMyModelTypes {
          items {
            id
            image
            link
            blank
            type
          }
        }
      }`;
      const tasks = await API.graphql(graphqlOperation(listTasks));
      commit("getItemsData", tasks.data.listMyModelTypes.items);
    },
    async createItems(state, data) {
      const createItems = `
      mutation createMyModelType($createmymodeltypeinput: CreateMyModelTypeInput!) {
        createMyModelType(input: $createmymodeltypeinput) {
          id
          image
          link
          blank
          type
        }
      }    
      `;
      const newTask = await API.graphql(
        graphqlOperation(createItems, { createmymodeltypeinput: data })
      );
      return newTask;
    },
    async updateItems(state, data) {
      const updateItems = `
      mutation createMyModelType($updatemymodeltypeinput: UpdateMyModelTypeInput!) {
        updateMyModelType(input: $updatemymodeltypeinput) {
          id
          image
          link
          blank
          type
        }
      }    
      `;
      const updatedTask = await API.graphql(
        graphqlOperation(updateItems, { updatemymodeltypeinput: data })
      );
      return updatedTask;
    },
    async deleteItems(state, taskId) {
      const deleteItems = `
      mutation deleteMyModelType($deletemymodeltypeinput: DeleteMyModelTypeInput!) {
        deleteMyModelType(input: $deletemymodeltypeinput) {
          id
        }
      }
      `;
      const taskDetails = {
        id: taskId
      };
      return API.graphql(
        graphqlOperation(deleteItems, { deletemymodeltypeinput: taskDetails })
      );
    }
  },
  mutations: {
    getItemsData(state, val) {
      state.items = val;
    }
  },
  getters: {}
};
