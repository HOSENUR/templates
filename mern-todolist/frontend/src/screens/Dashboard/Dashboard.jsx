import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  loginUserWithToken,
  signOutUser,
} from "../../redux/actionCreators/authActionCreator";

import DashboardNavbarComponent from "../../components/NavbarComponent/DashboardNavbarComponent";
import TodoList from "../../components/TodoList/TodoList";
import Profile from "../Profile/Profile";
import { getTodos } from "../../redux/actionCreators/todoListActionCreator";

const Dashboard = () => {
  const { token, isAuthenticated, isLoading, userId } = useSelector(
    (state) => ({
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.todos.isLoading,
      userId: state.auth.user.id,
    }),
    shallowEqual
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = localStorage.getItem("mjtlpmtoken");
    if (!getUser) {
      dispatch(signOutUser());
      navigate("/login");
      return;
    }

    const decodedToken = jwt_decode(JSON.parse(getUser).token);

    if (decodedToken.exp <= Date.now() / 1000) {
      toast.error("Login session expired! please login again!");
      navigate("/login");
      dispatch(signOutUser());
      return;
    }

    if (!isAuthenticated) {
      dispatch(loginUserWithToken(JSON.parse(getUser)));
      dispatch(
        getTodos(JSON.parse(getUser).user.id, JSON.parse(getUser).token)
      );
    }
    if (isAuthenticated) {
      if (isLoading) {
        dispatch(
          getTodos(JSON.parse(getUser).user.id, JSON.parse(getUser).token)
        );
      }
    }
  }, [window.location.pathname]);

  return (
    <MDBRow>
      <DashboardNavbarComponent />
      <MDBCol md="12">
        <Routes>
          <Route index path="" element={<TodoList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MDBCol>
    </MDBRow>
  );
};

export default Dashboard;
