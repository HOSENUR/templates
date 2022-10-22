import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  changeUserPassword,
  changeTheUserName,
} from "../../redux/actionCreators/userProfileActionCreator";

const Profile = () => {
  const [changeUserName, setChangeUserName] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conFirmPassword, setConFirmPassword] = useState("");

  const { userName, userId, token } = useSelector(
    (state) => ({
      userName: state.auth.user.name,
      userId: state.auth.user.id,
      token: state.auth.token,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const handleChangePassword = (e) => {
    e.preventDefault();

    dispatch(
      changeUserPassword(
        password,
        conFirmPassword,
        userId,
        token,
        setChangePassword
      )
    );
  };

  useEffect(() => {
    setNewUsername(userName);
  }, [userName]);
  return (
    <MDBRow>
      <h1 className="display-1 my-5 text-center">Profile</h1>
      <MDBCol md={3} className="mx-auto text-center my-5">
        <div className="card">
          <div className="card-body">
            <p className="text-center">User Name</p>
            {changeUserName ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter new user name"
                  onChange={(e) => setNewUsername(e.target.value)}
                  value={newUsername}
                />
                <button
                  className="btn my-2 btn-primary"
                  onClick={() => {
                    dispatch(
                      changeTheUserName(
                        newUsername,
                        userId,
                        token,
                        setChangeUserName
                      )
                    );
                  }}
                >
                  Change User Name
                </button>
              </>
            ) : (
              <>
                <p className="card-text">{userName}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setChangeUserName(true)}
                >
                  Change username
                </button>
              </>
            )}
          </div>
        </div>
      </MDBCol>
      <MDBCol md={3} className="mx-auto text-center my-5">
        <div className="card">
          <div className="card-body">
            <p className="text-center">Password</p>
            {changePassword ? (
              <form onSubmit={handleChangePassword}>
                <div className="form-group my-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="form-group my-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm new password"
                    onChange={(e) => setConFirmPassword(e.target.value)}
                    value={conFirmPassword}
                  />
                </div>
                <button className="btn mb-2 btn-primary" type="submit">
                  Change password
                </button>
              </form>
            ) : (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => setChangePassword(true)}
                >
                  Change password
                </button>
              </>
            )}
          </div>
        </div>
      </MDBCol>
    </MDBRow>
  );
};

export default Profile;
