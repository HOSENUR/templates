import * as types from "../actionTypes/todoListActionTypes";

const initialState = {
  isLoading: true,
  todos: [],
};

const todoListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case types.ADD_TODOS:
      return {
        ...state,
        todos: payload,
      };
    case types.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case types.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
      };
    case types.DONE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === payload) {
            todo.done = true;
          }
          return todo;
        }),
      };
    default:
      return state;
  }
};

export default todoListReducer;
