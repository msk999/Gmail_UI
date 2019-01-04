const config = {
  VUE_APP_BASE_URL: "http://vm-gmail.com/api/v1",
  VUE_APP_CLIENT_ID: "secret",
  VUE_APP_CLIENT_SECRET: "secret",

  getBaseUrl() {
    return this.VUE_APP_BASE_URL;
  }
};

export default config;
