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
} from "react";

import { toast } from "react-hot-toast";

import socket from "./lib/socket.js";
import useUserStore from "./user/useUserStore.js";

import Header from "./components/header.jsx";
import FriendsList from "./components/friendsList.jsx";

export default function Home() {
  const {
    credentials,
    data,
    setData,
    appendFriend
  } = useUserStore();

  // ✅ refs & state
  const email = useRef(null);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("added", (response) => {
      if (Array.isArray(response)) {
        toast.success(response[0]);
        appendFriend(response[1]);
      } else {
        toast.error(response);
      }
      clearForm();
    });

    socket.on("update_friend", (id) => {
      socket.emit("get_friend_data", id);
    });

    socket.on("friend_data", (newData) => {
      let temp = [];

      for (let obj of data) {
        if (obj.id === newData.id) {
          temp.push(newData);
        } else {
          temp.push(obj);
        }
      }

      setData(temp);
    });

    // ✅ cleanup (important)
    return () => {
      socket.off("added");
      socket.off("update_friend");
      socket.off("friend_data");
    };
  }, [data, appendFriend, setData]);

  const clearForm = () => {
    if (email.current) {
      email.current.value = "";
    }
    setLoading(false);
    modalRef.current?.close();
  };

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const add_friend = () => {
    let em = String(email.current.value).trim();

    setTimeout(() => {
      if (em === "") {
        toast.error("Please enter the email", { id: "error" });
        clearForm();
        return;
      }

      if (!validateEmail(em)) {
        toast.error("Invalid email");
        clearForm();
        return;
      }

      const exists = data.some((obj) => obj.email === em);
      if (exists) {
        toast.success("Friend is already in contact list");
        clearForm();
        return;
      }

      let dt = {
        yemail: credentials["email"],
        femail: em
      };

      socket.emit("addFriend", dt);
    }, 100);
  };

  return (
    <div>
      <Header />

      <FriendsList data={data} />

      {/* ✅ Floating Button */}
      <button
        className="btn absolute bottom-20 right-[10vw] h-[15vw] w-[15vw] bg-base-300 text-white p-2 rounded-full border-2 border-secondary-100"
        onClick={() => {
          modalRef.current?.showModal();
          setLoading(false);
        }}
      >
        <span className="text-primary">+ Add</span>
      </button>

      {/* ✅ Modal */}
      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">

          {/* Close Button */}
          <form method="dialog" onClick={clearForm}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary bg-base-100">
              ✕
            </button>
          </form>

          {/* Input */}
          <label className="bg-base-100 text-primary block mb-2 text-sm font-medium">
            Friend Gmail:
          </label>

          <input
            type="email"
            ref={email}
            className="border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-base-100 text-primary"
            placeholder="friend@company.com"
            required
          />

          {/* Add Button */}
          <button
            className="rounded-full border border-slate-300 py-2 px-4 text-sm transition-all shadow-sm hover:shadow-lg hover:border-primary-400 font-bold mt-2 bg-base-200 text-primary"
            onClick={() => {
              setLoading(true);
              add_friend();
            }}
            type="button"
          >
            {loading ? (
              <span className="loading loading-infinity loading-lg h-[2vh]"></span>
            ) : (
              <span>Add number</span>
            )}
          </button>
        </div>
      </dialog>
    </div>
  );
}
