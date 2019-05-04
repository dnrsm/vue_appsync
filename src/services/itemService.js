// import uuidV4 from "uuid/v4";
import { API, graphqlOperation } from "aws-amplify";

export default {
  async getItems() {
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
    return tasks.data.listMyModelTypes.items;
  },
  async createItems(data) {
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
  async updateItems(data) {
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
  async deleteItems(taskId) {
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
};
