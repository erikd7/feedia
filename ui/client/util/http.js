import axios from "axios";

const defaultHeaders = {};
const http = axios.create({
  headers: {
    common: defaultHeaders
  }
});

// Axios method wrappers
export const get = async (url, queryParams, { responseType = "json" } = {}) => {
  try {
    const response = await http.get(url, {
      params: queryParams,
      responseType
    });

    if (response.status === 200) {
      if (response.data) {
        return { ok: true, data: response.data };
      } else {
        return {
          ok: false,
          message: "Call succeeded but no data was returned."
        };
      }
    } else if (response.status === 204) {
      return { ok: true };
    }

    console.log(
      `Error in axios GET at url '${url}'. Message: ${response.toString()}`
    );
    return { ok: false, message: response.message };
  } catch (error) {
    console.error(`Error in axios GET at url '${url}'. Message: ${error}`);
    return { ok: false, message: error.message };
  }
};

export const post = async (url, body) => {
  try {
    const response = await http.post(url, body);

    if (response.status === 200 || response.status === 204) {
      return { ok: true, data: response.data };
    }

    console.log(
      `Error in axios POST at url '${url}'. Message: ${response.toString()}`
    );
    return { ok: false, message: response.message };
  } catch (error) {
    console.error(`Error in axios POST at url '${url}'. Message: ${error}`);
    return { ok: false, message: error.message };
  }
};
