import { combineReducers } from "redux";

import authReducer from "./authReducer";
import todoListReducer from "./todoListReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoListReducer,
});

export default rootReducer;
