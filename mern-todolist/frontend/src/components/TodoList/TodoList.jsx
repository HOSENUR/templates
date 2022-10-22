import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBBtn, MDBCol, MDBInputGroup, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteTodo,
  postTodo,
  updateTodo,
} from "../../redux/actionCreators/todoListActionCreator";

const TodoList = () => {
  const [item, setItem] = useState("");

  const dispatch = useDispatch();

  const { token, todos, isLoading, userId } = useSelector(
    (state) => ({
      token: state.auth.token,
      todos: state.todos.todos,
      isLoading: state.todos.isLoading,
      userId: state.auth.user.id,
    }),
    shallowEqual
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.trim() === "") {
      toast.error("Please enter a task!");
      return;
    }

    dispatch(postTodo({ title: item, done: false, user: userId }, token));
    setItem("");
  };

  return (
    <MDBRow>
      <h1 className="text-center display-2 mt-5">Todo List</h1>
      <MDBCol md="6" className="mx-auto my-4">
        <form className="w-100" onSubmit={handleSubmit}>
          <MDBInputGroup className="mb-3">
            <input
              className="form-control"
              placeholder="Enter todo"
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <MDBBtn>
              <FontAwesomeIcon icon={faPlusCircle} /> ADD
            </MDBBtn>
          </MDBInputGroup>
        </form>

        {/* all todos */}
        {isLoading ? (
          <h1 className="mt-5 display-2 text-center">Loading...</h1>
        ) : todos.length > 0 ? (
          <div className="list-group mt-5">
            {todos.map((todo, index) => (
              <div
                key={index * 551312}
                className="list-group-item pb-4 px-5 my-2 pt-3"
                style={{ cursor: todo.done ? "default" : "pointer" }}
                onClick={() => {
                  if (!todo.done) {
                    dispatch(updateTodo(todo._id, token));
                  }
                }}
              >
                <div className="d-flex align-items-center justify-content-end gap-2">
                  <p className="ml-auto my-0 text-end small">
                    {new Date(todo.createdAt).toDateString()}{" "}
                    {new Date(todo.createdAt).toLocaleTimeString()}
                  </p>
                  {todo.done ? (
                    <small className="badge badge-danger">Done</small>
                  ) : (
                    <small className="badge badge-warning">TODO</small>
                  )}
                </div>
                <div className="d-flex mt-2 justify-content-between align-items-center">
                  <h5
                    className={`mb-1 ${
                      todo.done && "text-decoration-line-through"
                    } `}
                  >
                    {todo.title}
                  </h5>
                  {todo.done && (
                    <button
                      className="btn btn-sm text-danger shadow-0"
                      onClick={() => {
                        dispatch(deleteTodo(todo._id, token));
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="mt-5 display-2 text-center">No todos</h1>
        )}
      </MDBCol>
    </MDBRow>
  );
};

export default TodoList;
