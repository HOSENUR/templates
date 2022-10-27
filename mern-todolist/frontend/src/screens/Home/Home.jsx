import { MDBRow } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  signOutUser,
  loginUserWithToken,
} from "../../redux/actionCreators/authActionCreator";
import jwt_decode from "jwt-decode";

const Home = () => {
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
      return;
    }

    if (!isAuthenticated) {
      dispatch(loginUserWithToken(JSON.parse(getUser)));
    }
  }, [window.location.pathname]);

  return (
    <MDBRow>
      <h1 className="display-1 my-5 text-center">Home Screen</h1>
    </MDBRow>
  );
};

export default Home;
