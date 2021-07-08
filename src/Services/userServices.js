import Axios from "./axiosServices.js";
const http = new Axios();
const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api";
export default class services {
  Registration = (data) => {
    return http.Post(`${baseUrl}/user/userSignUp`, data);
  };
  login = (data) => {
    return http.Post(`${baseUrl}/user/login`, data);
  };
  forgotPassword = (data) => {
    return http.Post(`${baseUrl}/user/reset`, data);
  };
  resetPassword = (data, token) => {
    return http.Post(`${baseUrl}/user/reset-password`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
  };
}