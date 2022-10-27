import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { signUpUser } from "../../../redux/actionCreators/authActionCreator";

import FormComponent from "../../../components/FormComponent/FormComponent";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please fill all fields!");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long!");
    }
    if (!password.match(/[a-z]/)) {
      return toast.error(
        "Password must contain at least one lowercase letter!"
      );
    }
    if (!password.match(/[A-Z]/)) {
      return toast.error(
        "Password must contain at least one uppercase letter!"
      );
    }
    if (!password.match(/[0-9]/)) {
      return toast.error("Password must contain at least one number!");
    }
    if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      return toast.error(
        "Password must contain at least one special character!"
      );
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    dispatch(signUpUser({ name, email, password }, setSuccess));
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success]);

  return (
    <MDBRow>
      <MDBCol md="4" className="mx-auto">
        <h1 className="display-3 text-center my-5">Register</h1>

        <FormComponent
          fields={[
            {
              id: "username",
              label: "Username",
              type: "text",
              value: name,
              onChange: setName,
            },
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
            {
              id: "confirmPassword",
              label: "Re-type password",
              type: "password",
              value: confirmPassword,
              onChange: setConfirmPassword,
            },
          ]}
          btnTitle="Login"
          onSubmit={handleSubmit}
        />
        <p className="small ms-auto text-end my-5">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </MDBCol>
    </MDBRow>
  );
};

export default Register;
