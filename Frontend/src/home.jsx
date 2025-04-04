import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import {
  useState,
  useEffect,
  useRef
} from "react"

import {
  toast
} from "react-hot-toast"

import socket from "./lib/socket.js"
import useUserStore from "./user/useUserStore.js";

import Header from "./components/header.jsx"
import FriendsList from "./components/friendsList.jsx"

export default function Home() {
  const {
    credentials,
    data,
    setData,
    //data = friend list with fields
    appendFriend
  } = useUserStore()

  useEffect(()=> {
    socket.on("added", (response) => {
      if (Array.isArray(response)) {
        toast.success(response[0])
        appendFriend(response[1])
      } else {
        toast.error(response);
      }
      clearForm()
    });
    socket.on("update_friend",
      (id)=> {
        socket.emit("get_friend_data", id)
      });
    socket.on("friend_data",
      (newData) => {
        let temp = [],
        obj
        for (obj of data) {
          if (obj.id === newData.id) {
            temp.push(newData)
          } else {
            temp.push(obj)
          }
        }
        setData(temp)
      });
  }, [])

  const email = useRef(null);
  const clearForm = () => {
    email.current.value = "";
    document.getElementById("my_modal_3").close();
  };

  const validateEmail = (email) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const add_friend = () => {
    let em = String(email.current.value).trim();
    setTimeout(()=> {
      if (em === "") {
        toast.error("Please enter the email", {
          id: "error"
        })
        clearForm()
        return
      }
      if (!validateEmail(em)) {
        toast.error("Invalid email");
        clearForm();
        return;
      }
      const exists = data.some(obj => obj.email === em);
      if (exists) {
        toast.success("Friend is already in contact list")
        clearForm()
        return
      }

      let dt = {
        yemail: credentials["email"],
        femail: em
      };
      socket.emit("addFriend", dt);
    },
      100)
  };

  return (
    <div>
      <Header />

      <FriendsList data={data} />

      <button
        className="btn absolute bottom-20 right-[10vw] button h-[15vw] w-[15vw] btn bg-base-300 text-white p-2 rounded-full border-2 border-secondary-100"
        onClick={() => {
          document.getElementById("my_modal_3").showModal();
          document.getElementById("text").classList.remove("hidden");
          document.getElementById("loader").classList.add("hidden");
        }}
        >
        <span className="text-primary">+ Add</span>
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form
            method="dialog"
            onClick={() => clearForm()}
            >
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary bg-base-100">
              ✕
            </button>
          </form>

          <label
            htmlFor="number-input"
            className="bg-base-100 text-primary block mb-2 text-sm font-medium"
            >
            Friend Gmail:
          </label>
          <input
          type="email"
          ref={email}
          aria-describedby="helper-text-explanation"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-base-100 text-primary"
          placeholder="friend@company.com"
          required
          />
        <button
          className="rounded-full border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg hover:border-primary-400 focus:text-white font-bold mt-2 bg-base-200 text-primary"
          onClick={() => {
            add_friend();
            document.getElementById("loader").classList.remove("hidden");
            document.getElementById("text").classList.add("hidden");
          }}
          type="button"
          >
          <span className="text-primary" id="text">
            Add number
          </span>
          <span
            id="loader"
            className="text-primary bg-base-400 loading loading-infinity loading-lg h-[2vh]"
            ></span>
        </button>
      </div>
    </dialog>
  </div>
);
}