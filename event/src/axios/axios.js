/** @format */

import axios from "axios";

export const axiosInstance = () => {
  const token = localStorage.getItem("users");
  return axios.create({
    baseURL: "http://localhost:5500",
    headers: {
      Authorization: token,
    },
  });
};

export const axiosInstanceSSR = () => {
  return axios.create({
    baseURL: "http://localhost:5500",
  });
};
