import ApiService from "./ApiService";
import ConfigService from "./ConfigService";

class RetrievalError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const MessageService = {
  retrieve: async () => {
    const requestData = {
      method: "get",
      url: ConfigService.getBaseUrl() + "/messages"
    };

    try {
      const response = await ApiService.get(requestData.url);
      console.log("Success:" + response);
      return response.data;
    } catch (error) {
      throw new RetrievalError(
        error.response.status,
        error.response.data.detail
      );
    }
  }
};

export { MessageService, RetrievalError };
