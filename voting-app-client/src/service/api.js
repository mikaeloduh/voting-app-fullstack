import axios from "axios";

function setTokenHeader(token) {
  let headers = new Headers();
  if (token) {
    headers.append("authorization", `Bearer ${token}`);
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

function apiCall(method, path, data) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjYyZDEyMDg3N2VhMDYyMzZhOTYzZSIsInVzZXJuYW1lIjoiYmFuYW5hIiwiaWF0IjoxNTI2MjU5NDA0fQ.75AsF0wQw5y4427_43S_rEylM7Kfd_s299fzL5RKWTU");

  fetch(path, {
    method: mathod,
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => {console.log(err)});

}

exports.module.apiCall = apiCall;
exports.module.setTokenHeader = setTokenHeader;
