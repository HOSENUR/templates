import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";

import "./App.css";

import Home from "./screens/Home/Home";
import Login from "./screens/Auth/Login/Login";
import Register from "./screens/Auth/Register/Register";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import Dashboard from "./screens/Dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <MDBContainer fluid>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavbarComponent />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </MDBContainer>
    </div>
  );
};

export default App;
