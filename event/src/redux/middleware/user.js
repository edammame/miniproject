import { axiosInstance } from "@/axios/axios";
import { functionLogin, functionLogout } from "../slices/userSlice";

export const userLogin = ({ username, email, password }) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance().get("/users", {
        params: { email, password },
      });

      if (res.data.result?.id) {
        const { email } = res.data.result;

        alert("welcome " + email);
        dispatch(functionLogin(res.data.result));

        localStorage.setItem("users", res.data.token);
      }
      return;
    } catch (err) {
      localStorage.removeItem("auth");
      alert("wrong email/password ");

      return err.message;
    }
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("users");
      const res = await axiosInstance().get("/users/keep-login", {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.result?.email) {
        dispatch(functionLogin(res.data.result));

        localStorage.setItem("user", res.data.token);
      } else {
        alert("user not found");
        throw Error("user not found");
      }
      return;
    } catch (err) {
      localStorage.removeItem("auth");
      dispatch(functionLogout());
      return err.message;
    }
  };
};
