import {
  useState,
  useRef
} from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import {
  toast
} from "react-hot-toast";

import useUserStore from "./user/useUserStore.js";
import axio from "./lib/axios.js"

function Signup() {
  const navigate = useNavigate()

  const setIslogin = useUserStore((state)=> state.setIslogin)
  const setUserId = useUserStore((state)=> state.setUserId)

  const [passwordVisible,
    setPasswordVisible] = useState(false);
  const [confirmPasswordVisible,
    setConfirmPasswordVisible] = useState(false);
  const email = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const togglePasswordVisibility = (inputRef, setVisible) => {
    inputRef.current.focus();
    setVisible((prev) => !prev);
  };

  const signup = (e) => {
    e.preventDefault();
    let em = email.current.value;
    let pas = passwordInput.current.value;
    let confirmpas = confirmPasswordInput.current.value;

    if (confirmpas !== pas) {
      toast.error("The passwords aren't matching!");
      return;
    } else if (pas.length < 8) {
      toast.error("The password must be at least 8 characters long.");
      return
    } else if (!/[A-Z]/.test(pas)) {
      toast.error("The password must contain at least one uppercase letter.");
      return
    } else if (!/[a-z]/.test(pas)) {
      toast.error("The password must contain at least one lowercase letter.");
      return
    } else if (!/[0-9]/.test(pas)) {
      toast.error("The password must contain at least one number.");
      return
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pas)) {
      toast.error("The password must contain at least one special character.");
      return
    }

    const data = {
      email: em,
      password: pas,
      confirmpassword: confirmpas
    };

    axio.post('/signup', data)
    .then((response) => {
      let dt = response.data.credentials
      localStorage.setItem("data", JSON.stringify(dt))
      toast.success(response.data.msg);
      navigate("/login", {
        replace: true
      })
    })
    .catch((error) => {
      const errorMessage = error.response.data.msg || "Error creating account!";
      toast.error(errorMessage);
    });
  };

  return (
    <section data-theme="light" className="h-[100vh] flex justify-center items-center bg-base-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Create an account
            </h1>
            <form onSubmit={signup} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-black "
                  >
                  Your email
                </label>
                <input
                ref={email}
                type="email"
                name="email"
                id="email"
                className="bg-base-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
                />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-black"
                >
                Password
              </label>
              <input
              type={passwordVisible ? "text": "password"}
              name="password"
              id="password"
              ref={passwordInput}
              placeholder="••••••••"
              className="bg-base-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 "
              required
              />
            <span
              onClick={() => togglePasswordVisibility(passwordInput, setPasswordVisible)}
              className="absolute inset-y-10 right-3 text-black flex cursor-pointer"
              >
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash: faEye}
                />
            </span>
          </div>
          <div className="relative">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-black"
              >
              Confirm password
            </label>
            <input
            type={confirmPasswordVisible ? "text": "password"}
            name="confirm-password"
            id="confirm-password"
            ref={confirmPasswordInput}
            placeholder="••••••••"
            className="bg-base-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 "
            required
            />
          <span
            onClick={() => togglePasswordVisibility(confirmPasswordInput, setConfirmPasswordVisible)}
            className="absolute inset-y-12 right-3 flex items-center cursor-pointer text-black"
            >
            <FontAwesomeIcon
              icon={confirmPasswordVisible ? faEyeSlash: faEye}
              />
          </span>
        </div>
        <button
          className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="submit"
          >
          Create an account
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" replace={true}>
            <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Login here
            </span>
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>
</section>
);
}

export default Signup;