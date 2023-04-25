import axios from "axios";

//Axios method wrappers
const defaultHeaders = {
  "Access-Control-Allow-Origin": "*"
};
export const axiosGet = async (url, queryParams) => {
  const response = await axios({
    method: "get",
    headers: defaultHeaders,
    url,
    data: queryParams
  });
  if (response.status === 200) {
    if (response.data) {
      return { ok: true, data: response.data };
    } else {
      return { ok: false, message: "Call succeeded but no data was returned." };
    }
  } else if (response.status === 204) {
    return { ok: true };
  }

  console.log(
    `Error in axios GET at url '${url}. Message: ${response.toString()}`
  );
  return { ok: false, message: response.message };
};

export const axiosPost = async (url, body) => {
  const response = await axios({
    method: "post",
    headers: defaultHeaders,
    url,
    data: body
  });
  if (response.status === 200 || response.status === 204) {
    return { ok: true, data: response.data };
  }
  console.log(
    `Error in axios POST at url '${url}. Message: ${response.toString()}`
  );
  return { ok: false, message: response.message };
};
