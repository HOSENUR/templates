import * as types from "../actionTypes/authActionTypes";
import * as userTypes from "../actionTypes/userProfileActionTypes";
const initialState = {
  isAuthenticated: false,
  user: {},
  token: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userTypes.CHANGE_USER_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: payload,
        },
      };
    case types.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        token: payload.token,
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
