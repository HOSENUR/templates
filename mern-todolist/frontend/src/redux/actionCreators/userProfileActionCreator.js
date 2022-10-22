import * as types from "../actionTypes/userProfileActionTypes";
import axios from "axios";
import { toast } from "react-toastify";

// action

const setUserName = (name) => ({
  type: types.CHANGE_USER_NAME,
  payload: name,
});

// action creators

export const changeUserPassword =
  (password, confirmPassword, userId, token, setChangePassword) =>
  (dispatch) => {
    axios
      .post(
        `${import.meta.env.VITE_Backend_EndPoint}/api/user/changePassword`,
        {
          newPassword: password,
          confirmPass: confirmPassword,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Password changed successfully");
        setChangePassword(false);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

export const changeTheUserName =
  (name, userId, token, setChangeUserName) => (dispatch) => {
    axios
      .post(
        `${import.meta.env.VITE_Backend_EndPoint}/api/user/changeName`,
        {
          newName: name,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Name changed successfully");
        dispatch(setUserName(res.data.name));
        setChangeUserName(false);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };
