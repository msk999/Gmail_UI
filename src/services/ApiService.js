// import axios from "axios";
import TokenService from "@/services/StorageService";

const ApiService = {
  init(baseURL) {
    this.$http.options.root = baseURL;
  },

  setHeader() {
    this.$http.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()}`;
    this.$http.headers.common["Accept"] = "application/json";
    this.$http.headers.common["Content-Type"] = "application/json";
  },

  removeHeader() {
    this.$http.headers.common = {};
  },

  get(resource) {
    return this.$http.get(resource);
  },

  post(resource, data) {
    console.log("data:" + data);
    return this.$http.post(resource, data);
  },

  put(resource, data) {
    return this.$http.put(resource, data);
  },

  delete(resource) {
    return this.$http.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    debugger;
    return this.$http(data);
  }
};

export default ApiService;
