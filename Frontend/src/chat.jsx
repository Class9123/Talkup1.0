import React, {
  useState,
  useEffect,
  useRef
} from "react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import {
  faPaperPlane,
  faArrowDown,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons"
import useUserStore from "./user/useUserStore.js";
import socket from "./lib/socket.js"
import useDateTime from "./components/nepalidate.jsx";


const ChatApp = () => {
  const dateTimeString = useDateTime();
  const {
    credentials,
    data,
    currentChattingFriendIndex,
  } = useUserStore();
  const {
    id: f_id,
    name: f_name,
    status: f_status,
    pr: f_pr
  } = data[currentChattingFriendIndex]
  const [loading,
    setLoading] = useState(true)
  const navigate = useNavigate()

  const [messages,
    setMessages] = useState([]);
  const [input,
    setInput] = useState("");

  const [isAtBottom,
    setIsAtBottom] = useState(true);

  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const SCROLL_THRESHOLD = 50; // Threshold for enabling the scroll button

  const sendMessage = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (input.trim() === "") return;
    let message = {
      senderId: credentials.id,
      receiver: f_id,
      text: input,
      image: "",
      time: dateTimeString
    }
    setMessages([
      ...messages,
      message
    ]);
    socket.emit("send_message", {
      "id": f_id, "text": input, "time": dateTimeString, "image": ""
    })
    setInput("");

    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        setIsAtBottom(true);
      }, 100);
    }
  };
  useEffect(()=> {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [])

  useEffect(() => {
    if (chatContainerRef.current && isAtBottom) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  },
    [messages,
      isAtBottom]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const {
        scrollHeight,
        scrollTop,
        clientHeight
      } = chatContainerRef.current;
      const atBottom = scrollHeight - scrollTop - clientHeight <= SCROLL_THRESHOLD;
      setIsAtBottom(atBottom);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      setIsAtBottom(true);
    }
  };

  useEffect(()=> {
    socket.emit("get_messages", f_id)
    socket.on("messages", (response)=> {
      setMessages(response)
      setLoading(false)
    })
  }, [f_id, f_name, f_status, f_pr])

  if (loading) {
    return (
      <div className="w-screen h-screen bg-base-100 text-primary flex flex-col">
        <div className="w-full text-lg shadow-lg flex items-center border-b-[0.01rem] border-b-gray p-2 ">
          <span className="ml-3 mr-4">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
          </span>
          <span className="flex flex-col">
            {/* Skeleton for name and status */}
            <div className="skeleton h-5 w-32"></div>
            <div className="skeleton h-4 w-20 mt-1"></div>
          </span>
        </div>

        <div
          className="flex flex-col gap-2 p-4"
          ref={chatContainerRef}
          onScroll={handleScroll}
          >
          <div className="w-full h-[10vh] skeleton "></div>
          <div className="w-full h-[10vh] skeleton "></div>
          <div className="w-full h-[10vh] skeleton "></div>
          <div className="w-full h-[10vh] skeleton "></div>
          <div className="w-full h-[10vh] skeleton "></div>
          <div className="w-full h-[10vh] skeleton "></div>
          <div className="w-full h-[10vh] skeleton "></div>
        </div>

        {/* Scroll to bottom button */}
        {!isAtBottom && (
          <button
            onClick={()=> {
              scrollToBottom()
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            className="fixed bottom-20 right-4 bg-base-300 text-primary p-2 w-8 h-8 rounded-full shadow-md hover:bg-base-400 transition"
            disabled={isAtBottom}
            >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        )}

        <div className="absolute bottom-0 left-0 w-full bg-base shadow-lg px-4 py-3 flex items-center">
          <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 shadow-lg p-3 rounded-full hover:outline-base-300 focus:outline-base-300 transition duration-200  placeholder:text-primary text-[0.8rem]"
          ref={inputRef}
          />
        <button
          className="ml-2 bg-primary text-white px-4 py-4 rounded-full transition flex items-center justify-center hover:outline-base-300 focus:outline-base-300 transition duration-200 "
          >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  )
}

return (
  <div className="w-screen h-screen bg-base-100 text-primary flex flex-col">
    <div className="w-full text-lg shadow-lg flex items-center border-b-[0.01rem] border-b-gray p-2">
      <span className=" ml-3 mr-4">
        <FontAwesomeIcon icon={faArrowLeft} onClick={()=>navigate(-1)} />
      </span>
      <span className="flex flex-col">
        <span className="mt-1 h-5 text-[1.1rem]">{f_name}</span>
        <span className="opacity-70 ml-[3px] text-[0.7rem] ">{f_status}</span>
      </span>
    </div>
    <div
      className="flex-1 overflow-y-auto p-4 pb-36" // Added padding-bottom for the messages container
      ref={chatContainerRef}
      onScroll={handleScroll}
      >
      {messages.map((message, index) =>
        message.senderId === credentials.id ? (
          // UI for the user's message
          <div
            key={index}
            className="chat chat-end transition-all duration-500 ease-in-out animate-fadeInUp"
            >
            <div className="chat-header text-sm">
              You{" "}
              <time className="text-xs opacity-50">
                {message.time}
              </time>
            </div>
            <div className="chat-bubble break-all text-primary">
              {message.text}
            </div>
            <div className="chat-footer text-xs opacity-50">
              Delivered
            </div>
          </div>
        ): (
          // UI for the friend's message
          <div
            key={index}
            className="chat chat-start transition-all duration-500 ease-in-out animate-fadeInUp"
            >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Friend Avatar" src={f_pr} />
            </div>
          </div>
          <div className="chat-header text-sm">
            Friend{" "}
            <time className="text-xs opacity-50">
              {message.time}
            </time>
          </div>
          <div className="chat-bubble break-all text-primary">
            {message.text}
          </div>
          <div className="chat-footer text-xs opacity-50">
            Delivered
          </div>
        </div>
      )
    )}
  </div>


  {/* Scroll to bottom button */}
  {!isAtBottom && (
    <button
      onClick={()=> {
        scrollToBottom()
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      className="fixed bottom-20 right-4 bg-base-300 text-primary p-2 w-8 h-8 rounded-full shadow-md hover:bg-base-400 transition"
      disabled={isAtBottom}
      >
      <FontAwesomeIcon icon={faArrowDown} />
    </button>
  )}

  <div className="absolute bottom-0 left-0 w-full bg-base shadow-lg px-4 py-3 flex items-center">
    <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type your message..."
    className="flex-1 shadow-lg p-3 rounded-full hover:outline-base-300 focus:outline-base-300 transition duration-200  placeholder:text-primary text-[0.8rem]"
    ref={inputRef}
    />
  <button
    onClick={sendMessage}
    className="ml-2 bg-primary text-white px-4 py-4 rounded-full transition flex items-center justify-center hover:outline-base-300 focus:outline-base-300 transition duration-200 "
    >
    <FontAwesomeIcon icon={faPaperPlane} />
  </button>
</div>
</div>
);
};

export default ChatApp;