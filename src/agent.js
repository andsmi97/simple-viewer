import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

export const API_ROOT = "http://localhost:8081/api";

const responseBody = res => res.body;
let token = null;

const tokenPlugin = req => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  patch: (url, body) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

const Actions = {
  getAll: () => requests.get("/actions"),
  onClick: (actionId, actionTypeDataId) =>
    requests.post(`/actions/${actionId}/${actionTypeDataId}`),
  onChange: (actionId, actionTypeDataId, value) =>
    requests.post(`/actions/${actionId}/${actionTypeDataId}`, { value })
};

export default {
  Actions,
  setToken: _token => {
    token = _token;
  }
};
