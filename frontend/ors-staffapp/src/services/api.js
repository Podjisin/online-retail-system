import axios from "axios";

const apiKey = "mockapikey6";
const baseUrl = "http://localhost:8000";

console.log("apiKey:", apiKey);

const headers = {
  "x-api-key": apiKey,
};
const apiHandler = {
  async getHealth() {
    try {
      const response = await axios.get(`${baseUrl}/public/health/db`, {
        headers: headers,
      });
      return response;
    } catch (error) {
      console.log("API getHealth | ERROR: ", error);
      return error.response;
    }
  },

  async checkApi() {
    try {
      const response = await axios.get(`${baseUrl}/public/health/api`, {
        headers: headers,
      });
      return response;
    } catch (error) {
      console.log("API checkApi | ERROR: ", error);
      return error.response;
    }
  },

  async checkApiConn(url, key) {
    try {
      const response = await axios.get(`${url}/health/api`, {
        headers: {
          "x-api-key": key,
        },
      });
      return response;
    } catch (error) {
      console.log("API checkApiCon | ERROR: ", error);
      return error.response;
    }
  },

  async get(endpoint) {
    try {
      const response = await axios.get(`${baseUrl}/${endpoint}`, {
        headers: headers,
      });
      return response;
    } catch (error) {
      console.log("API GET | ERROR: ", error);
      return error.response;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await axios.post(`${baseUrl}/${endpoint}`, data, {
        headers: headers,
      });
      console.log("API HANDLER | response:", response);
      return response;
    } catch (error) {
      console.log("API POST | ERROR: ", error);
      return error.response;
    }
  },

  async put(endpoint, data) {
    try {
      const response = await axios.put(`${baseUrl}/${endpoint}`, data, {
        headers: headers,
      });
      return response;
    } catch (error) {
      console.log("API PUT | ERROR: ", error);
      return error;
    }
  },

  async delete(endpoint) {
    try {
      const response = await axios.delete(`${baseUrl}/${endpoint}`, {
        headers: headers,
      });
      return response;
    } catch (error) {
      console.log("API DELETE | ERROR: ", error);
      return error.response;
    }
  },
};

export default apiHandler;
