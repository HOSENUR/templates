import * as types from "../actionTypes/authActionTypes";
import axios from "axios";
import { toast } from "react-toastify";

// actions

const loginUser = (user) => ({
  type: types.LOGIN_USER,
  payload: user,
});

const logoutUser = () => ({
  type: types.LOGOUT_USER,
});

//action creators

export const signInUser = (userData, setSuccess) => (dispatch) => {
  axios
    .post(`${import.meta.env.VITE_Backend_EndPoint}/api/auth/login`, {
      email: userData.email,
      password: userData.password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem(
          "mjtlpmtoken",
          JSON.stringify({
            user: res.data.user,
            token: res.data.token,
          })
        );
        toast.success("Login Successful!!");
        dispatch(loginUser(res.data));
        setSuccess(true);
      }
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
    });
};

export const signOutUser = () => (dispatch) => {
  localStorage.removeItem("mjtlpmtoken");
  dispatch(logoutUser());
};

export const signUpUser = (userData, setSuccess) => (dispatch) => {
  axios
    .post(
      `${import.meta.env.VITE_Backend_EndPoint}/api/auth/register`,
      userData
    )
    .then((res) => {
      if (res.data.success) {
        toast.success(res.data.msg);
        setSuccess(true);
      }
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
    });
};

export const loginUserWithToken = (userData) => (dispatch) => {
  dispatch(loginUser(userData));
};
