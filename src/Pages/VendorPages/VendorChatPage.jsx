import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { VendorChat } from "../../Api/VendorApi";
import VendorNavbar from "../../Components/Layouts/VendorNavbar";
// ... (imports)

function VendorChatPage() {
  const { bookingId } = useParams();
  const [message, setMessage] = useState("");
  const [chatterName, setChatterName] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    if (bookingId) {
      newSocket.emit("join-chat", { bookingId });
    }

    newSocket.on("messageResponse", (data) => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { from: "vendor", message: data.message, chatId: bookingId },
      ]);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [bookingId]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("sendMessage", {
        from: "vendor",
        message,
        chatId: bookingId,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    VendorChat(bookingId)
      .then((res) => {
        console.log(res,"res");
        const chatterName = res.data.chat.user;
        setChatterName(chatterName)
        console.log(chatterName,"name");
        const chatData = res.data.chat.chat;
        console.log(chatData,"chatd");
        setChatMessages(chatData);
        scrollToBottom();
      })
      .catch((err) => console.log(err.message));
  }, [bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
 
  return (
    <>
    <VendorNavbar/>
    <div className="flex flex-col h-screen items-center p-6 py-5 ">
    <div className="flex flex-row items-center gap-3 border-b w-full p-4 ">
      <img
        src={chatterName.image}
        alt={chatterName.name}
        className="w-12 h-12 rounded-full shadow-xl"
      />
      <h2 className="font-semibold text-lg">{chatterName.name}</h2>
    </div>
    <div className="w-full h-5/6 bg-green-50 my-2 p-4 overflow-auto">
      {chatMessages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.from === "vendor" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`bg-white text-xl m-3 p-4 rounded-md ${
              msg.from === "vendor" ? "from-user" : "from-vendor"
            }`}
          >
            {msg.message}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
    <div className="flex flex-row items-baseline w-full p-4">
      <input
        type="text"
        value={message}
        placeholder="Type something..."
        onChange={(e) => setMessage(e.target.value)}
        className="w-11/12 h-12 placeholder:text-start border border-gray-300 rounded-l-md p-3"
      />
      <button
        className="m-2 w-36 h-12 bg-green-700 text-white rounded-r-md"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  </div>
  </>
);
}

export default VendorChatPage;
