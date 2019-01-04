import ApiService from "./ApiService";
import TokenService from "./StorageService";
import ConfigService from "./ConfigService";

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const UserService = {
  /**
   * Login the user and store the access token to TokenService.
   *
   * @returns jwt
   * @throws AuthenticationError
   **/
  login: async function(email, password) {
    const requestData = {
      method: "post",
      url: ConfigService.getBaseUrl() + "/user_token",
      data: {
        auth: {
          email: email,
          password: password
        }
      }
    };

    try {
      const response = await ApiService.post(requestData.url, requestData.data);
      TokenService.saveToken(response.data.jwt);
      TokenService.saveRefreshToken(response.data.refresh_token);
      ApiService.setHeader();

      // NOTE: We haven't covered this yet in our ApiService
      //       but don't worry about this just yet - I'll come back to it later
      // ApiService.mount401Interceptor();
      console.log("Success:" + response.data.jwt);
      return response.data.jwt;
    } catch (error) {
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  /**
   * Refresh the access token.
   **/
  refreshToken: async function() {
    const refreshToken = TokenService.getRefreshToken();

    const requestData = {
      method: "post",
      url: ConfigService.getBaseUrl() + "/user_token",
      data: {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      TokenService.saveToken(response.data.access_token);
      TokenService.saveRefreshToken(response.data.refresh_token);
      // Update the header in ApiService
      ApiService.setHeader();

      return response.data.access_token;
    } catch (error) {
      console.log("Error: " + error);
      throw new AuthenticationError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  /**
   * Logout the current user by removing the token from storage.
   *
   * Will also remove `Authorization Bearer <token>` header from future requests.
   **/
  logout() {
    // Remove the token and remove Authorization header from Api Service as well
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    ApiService.removeHeader();

    // NOTE: Again, we'll cover the 401 Interceptor a bit later.
    ApiService.unmount401Interceptor();
  }
};

export default UserService;
