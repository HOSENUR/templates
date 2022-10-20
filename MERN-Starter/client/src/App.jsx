import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Routing
import PrivateRoutes from "./components/routing/PrivateRoutes";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<PrivateScreen />} />
          </Route>
          <Route exact path="/login" element={<LoginScreen/>} />
          <Route exact path="/register" element={<RegisterScreen/>} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
