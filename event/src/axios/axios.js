/** @format */

import axios from "axios";

export const axiosInstance = () => {
  const token = localStorage.getItem("user");
  return axios.create({
    baseURL: "http://localhost:5555",
    headers: {
      Authorization: token,
    },
  });
};

export const axiosInstanceSSR = () => {
  return axios.create({
    baseURL: "http://localhost:5555",
  });
};
