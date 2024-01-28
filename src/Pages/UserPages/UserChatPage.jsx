import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { chatDetails } from "../../Api/UserApi";
import { useSelector } from "react-redux";
import { StickyNavbar } from "../../Components/Layouts/Navbar";

function UserChatPage() {
  const { vendorId, bookingId } = useParams();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const vendor = useSelector((state) => {
    if (state.User.vendor._id === vendorId) {
      return state.User.vendor;
    }
  });

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    if (bookingId && vendorId) {
      newSocket.emit("join-chat", { bookingId, vendorId });
    }

    newSocket.on("messageResponse", (data) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { from: "user", message: data.message, chatId: bookingId },
      ]);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [bookingId, vendorId]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("sendMessage", { from: "user", message, chatId: bookingId });
      setMessage("");
    }
  };

  useEffect(() => {
    chatDetails(bookingId)
      .then((res) => {
        const chatData = res.data.chatData;
        setChatMessages(chatData.chat);
        scrollToBottom();
      })
      .catch((err) => console.log(err.message));
  }, [bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <StickyNavbar />
      <div className="flex flex-col h-screen  items-center p-6 py-5">
        <div className="flex flex-row items-center gap-3 border-b w-full p-4">
          <img
            src={vendor.image}
            alt={vendor}
            className="w-12 h-12 rounded-full shadow-xl"
          />
          <h2 className="font-semibold text-lg">{vendor.name}</h2>
        </div>
        <div className="w-full h-5/6  bg-green-50 my-2 p-4 overflow-auto">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`bg-white text-xl m-3 p-4 rounded-md ${
                  msg.from === "user" ? "from-vendor" : "from-user"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-row items-baseline w-full">
          <input
            type="text"
            value={message}
            placeholder="type something......"
            onChange={(e) => setMessage(e.target.value)}
            className="w-11/12 h-12 placeholder:text-start"
          />
          <button
            className="m-2 w-36 h-12 bg-green-700 text-white"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default UserChatPage;
