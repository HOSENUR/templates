import { useEffect, useState } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../redux/actionCreators/authActionCreator";

import FormComponent from "../../../components/FormComponent/FormComponent";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill all fields!");
    }

    dispatch(signInUser({ email, password }, setSuccess));
  };

  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success]);

  return (
    <MDBRow>
      <MDBCol md="4" className="mx-auto">
        <h1 className="display-3 text-center my-5">Login</h1>

        <FormComponent
          fields={[
            {
              id: "email",
              label: "Email",
              type: "email",
              value: email,
              onChange: setEmail,
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              value: password,
              onChange: setPassword,
            },
          ]}
          btnTitle="Login"
          onSubmit={handleSubmit}
        />
        <p className="small ms-auto text-end my-5">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </MDBCol>
    </MDBRow>
  );
};

export default Login;
