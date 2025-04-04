import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate
} from "react-router-dom";
import {
  Toaster
} from "react-hot-toast";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import {
  useState,
  useEffect
} from "react";

import PrivateRoute from "./components/privateRoute.jsx"
import Notfound from "./components/not_found.jsx"
import useUserStore from "./user/useUserStore.js";

import Home from "./home.jsx";
import Login from "./login.jsx"
import Signup from "./signup.jsx"
import Setting from "./setting.jsx"
import Profile from "./profile.jsx"
import Chat from "./chat.jsx"

const App = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add useNavigate
  const [selected,
    setSelected] = useState("");
  const {
    islogin
  } = useUserStore();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/home")) {
      setSelected("home");
    } else if (path.startsWith("/profile")) {
      setSelected("profile");
    } else if (path.startsWith("/setting")) {
      setSelected("setting");
    } else {
      setSelected("")
    }
  },
    [location]);

  const handleNavigation = (route) => {
    if (location.pathname === `/${route}`) return; // Prevent navigation if already on the selected route
    setSelected(route);
    navigate(`/${route}`);
  };

  return (
    <div className="bg-base-100 min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <div className="flex-grow">
        <Routes>
          <Route path="/*" element={<Notfound />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={
              <PrivateRoute reverse={true}>
                <Signup />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute reverse={false}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute reverse={false}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/setting"
            element={
              <PrivateRoute reverse={false}>
                <Setting />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute reverse={false}>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {selected !== "" && (
        <div className="flex justify-around absolute items-center bottom-0 w-[100vw] border-t-[1px] border-t-gray p-3 bg-base-300">
          <FontAwesomeIcon
            icon={faHome}
            color={selected === "home" ? "black" : "gray"}
            className="h-[7vw] w-[7vw]"
            onClick={() => handleNavigation("home")} // Update navigation logic
          />
          <FontAwesomeIcon
            icon={faUser}
            color={selected === "profile" ? "black" : "gray"}
            className="h-[7vw] w-[7vw]"
            onClick={() => handleNavigation("profile")} // Update navigation logic
          />
          <FontAwesomeIcon
            icon={faGear}
            color={selected === "setting" ? "black" : "gray"}
            className="h-[7vw] w-[7vw]"
            onClick={() => handleNavigation("setting")} // Update navigation logic
          />
        </div>
      )}
    </div>
  );
};

export default App ;
