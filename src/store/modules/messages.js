import { MessageService } from "@/services/MessageService";
import router from "@/router";

export const namespaced = true;

export const state = {
  messages: [],
  retrieving: false,
  messageRetrievingErrorCode: 0,
  messageRetrievingError: ""
};

export const getters = {
  messages: state => {
    return state.messages;
  },

  messageRetrievingErrorCode: state => {
    return state.messageRetrievingErrorCode;
  },

  messageRetrievingError: state => {
    return state.messageRetrievingError;
  },

  retrieving: state => {
    return state.retrieving;
  }
};

export const actions = {
  async retrieve({ commit }) {
    commit("MESSAGES_REQUEST");
    try {
      const messages = await MessageService.retrieve();
      commit("MESSAGES_SUCCESS", messages);

      // Redirect the user to the page he first tried to visit or to the home view

      return true;
    } catch (error) {
      // if (e instanceof AuthenticationError) {
      commit("MESSAGES_ERROR", {
        errorCode: error.errorCode,
        errorMessage: error.message
      });
      router.push("/login");
      // }

      return false;
    }
  }
};

export const mutations = {
  MESSAGES_REQUEST(state) {
    state.retrieving = true;
    state.messageRetrievingError = "";
    state.messageRetrievingErrorCode = 0;
  },

  MESSAGES_SUCCESS(state, messages) {
    state.messages = messages;
    state.retrieving = false;
  },

  MESSAGES_ERROR(state, { errorCode, errorMessage }) {
    state.retrieving = false;
    state.messageRetrievingErrorCode = errorCode;
    state.messageRetrievingError = errorMessage;
  }
};
