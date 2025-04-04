import React, {
  useState,
  useRef,
  useEffect
} from "react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  toast
} from "react-hot-toast";
import axios from "./lib/axios.js";
import socket from "./lib/socket.js";
import useUserStore from "./user/useUserStore.js";

function Login() {
    
  const [loading,
    setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    setCredentials,
    setIslogin,
    setData
  } = useUserStore()
  
  const email = useRef();
  const password = useRef();
  const [passwordVisible,
    setPasswordVisible] = useState(false);

  const login = (e) => {
    e.preventDefault();
    let em = email.current.value
    let pas = password.current.value
    const dt = {
      email: em,
      password: pas
    };
    axios.post("/login", dt)
    .then((response) => {
      let credentials = response.data.credentials
      setCredentials(credentials)
      localStorage.setItem("data", JSON.stringify(credentials))
      socket.emit("register", credentials);
      socket.on("take_friends", (response) => {
        setIslogin(true);
        setData(response);
        toast.success("Log in successfully ")
        navigate("/home", {
          replace: true
        });
      });

    })
    .catch((error) => {
      toast.error("Invalid credentials");
      setLoading(false);
    });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setLoading(true);
      axios.post("/login", data)
      .then((response) => {
        let credentials = response.data.credentials
        setCredentials(credentials)
        localStorage.setItem("data", JSON.stringify(credentials))
        socket.emit("register", credentials);
        socket.on("take_friends", (response) => {
          setData(response);
          toast.success("Log in successfully ")
          setIslogin(true);
          navigate("/home", {
            replace: true
          });
        });

      })
      .catch((error) => {
        localStorage.setItem("data", null)
        toast.error("Invalid credentials");
        setLoading(false);
      });
    }
  },
    [navigate,
      setIslogin]);

  const togglePasswordVisibility = () => {
    if (password.current) password.current.focus();
    setPasswordVisible((prev) => !prev);
  };

  if (loading) {
    return (
      <div data-theme="light" className="w-[100vw] h-[100vh] flex flex-wrap gap-6 p-4">
        <div className="absolute flex object-center items-center left-[50vw] top-[50vh] transform translate-x-[-50%] translate-y-[-50%]  ">
        </div>

        <div className="flex w-40 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-40 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-40 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-40 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-40 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
        <div className="flex w-40 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div data-theme="light" className="flex justify-center items-center bg-base-100 h-[100vh]">
      <div className="sm:max-w-md bg-gray-100 rounded-lg shadow-md m-5">
        <div className="p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h1>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
                >
                Your email
              </label>
              <input
              ref={email}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
              />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-black"
              >
              Password
            </label>
            <div className="relative">
              <input
              ref={password}
              type={passwordVisible ? "text": "password"}
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
              />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-black"
              >
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash: faEye}
                />
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
          >
          Sign in
        </button>
        <p className="text-sm font-light text-gray-500">
          Don’t have an account yet?{" "}
          <Link to="/signup" replace={true}>
            <span className="font-medium text-primary-600 hover:underline">
              Sign up
            </span>
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>
);
}

export default Login;