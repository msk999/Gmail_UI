import UserService from "@/services/UserService";
import TokenService from "@/services/StorageService";
import router from "@/router";

export const namespaced = true;

export const state = {
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: ""
};

export const getters = {
  loggedIn: state => {
    return state.accessToken ? true : false;
  },

  authenticationErrorCode: state => {
    return state.authenticationErrorCode;
  },

  authenticationError: state => {
    return state.authenticationError;
  },

  authenticating: state => {
    return state.authenticating;
  }
};

export const actions = {
  async login({ commit }, { email, password }) {
    commit("LOGIN_REQUEST");

    try {
      const token = await UserService.login(email, password);
      commit("LOGIN_SUCCESS", token);

      // Redirect the user to the page he first tried to visit or to the home view
      router.push(router.history.current.query.redirect || "/");

      return true;
    } catch (error) {
      // if (e instanceof AuthenticationError) {
      commit("LOGIN_ERROR", {
        errorCode: error.errorCode,
        errorMessage: error.message
      });
      // }

      return false;
    }
  },

  logout({ commit }) {
    UserService.logout();
    commit("logoutSuccess");
    router.push("/login");
  }
};

export const mutations = {
  LOGIN_REQUEST(state) {
    state.authenticating = true;
    state.authenticationError = "";
    state.authenticationErrorCode = 0;
  },

  LOGIN_SUCCESS(state, accessToken) {
    state.accessToken = accessToken;
    state.authenticating = false;
  },

  LOGIN_ERROR(state, { errorCode, errorMessage }) {
    state.authenticating = false;
    state.authenticationErrorCode = errorCode;
    state.authenticationError = errorMessage;
  },

  logoutSuccess(state) {
    state.accessToken = "";
  }
};
