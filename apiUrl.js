import axios from "axios";
import { getToken, removeToken } from "../helper";

const calendar = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT_CALENDARSYSTEM,
});
calendar.interceptors.request.use(
  // we have stored token while logging in
  //if we have token saved then it will bw added in headers
  function (config) {
    let token = getToken();
    if (token && token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
calendar.interceptors.response.use(
  // if we have response then it will return it else if
  // response is not there because of authorization then
  // it will redirect to login page
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      removeToken();
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default calendar;
