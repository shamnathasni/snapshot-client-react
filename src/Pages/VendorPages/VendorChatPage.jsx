import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { VendorChat } from "../../Api/VendorApi";
// ... (imports)

function VendorChatPage() {
  const { bookingId } = useParams();
  const [message, setMessage] = useState("");
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
        const chatData = res.data.chat.chat;
        setChatMessages(chatData);
        scrollToBottom();
      })
      .catch((err) => console.log(err.message));
  }, [bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="flex flex-col h-screen items-center p-6 py-5">
      <h2>Chatting with User ID: {bookingId}</h2>
      <div className="w-full h-5/6 bg-slate-50 my-2 p-4 overflow-auto">
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
  );
}

export default VendorChatPage;
