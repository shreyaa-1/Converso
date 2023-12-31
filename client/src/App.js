import "./styles/app.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendEmail from "./pages/Email";
import { Toaster } from "react-hot-toast";
import Chats from "./pages/Chats";

import Profile from "./components/profile"

function App() {
  const Protected = ({ children }) => {
    if (!localStorage.getItem("token")) {
      return (
        <Navigate
          replace={true}
          to="/"
        ></Navigate>
      );
    }
    return children;
  };

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/sendotp"
          element={< SendEmail/>}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/chats"
          element={
            <Protected>
              <Chats />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
