import axios from "axios";

import store from "@/store";
import { get } from "@/utils/cookies";

const http = axios.create({
  baseURL: "http://api.workaround.local",
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

http.interceptors.request.use(
  (request) => {
    const token = get("token");

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    console.log("request error");
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    if (response.status == 401) {
      store.dispatch("logout");
    }

    return response;
  },
  (error) => {
    // if(error.response === undefined) {}
    Promise.reject(error);
  }
);

export default http;
