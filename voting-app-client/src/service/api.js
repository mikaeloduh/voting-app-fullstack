import axios from "axios";

function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

function apiCall(method, path, data) {
  return axios({
    method: method,
    url: path,
    data: data
  })
  .then(res => {
    return (res.data);
  })
  .catch(err => {
    return ("err.response.data.error");
  });
}

export { apiCall, setTokenHeader };
