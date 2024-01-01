// import React, { useEffect, useState } from "react";

// import ChatBody from "../../Components/Chat/ChatBody";
// import ChatFooter from "../../Components/Chat/ChatFooter";
// import { useLocation } from "react-router-dom";

// function UserChatPage({ socket }) {
//   const location = useLocation()
//   const vendorId = location.state.vendorId
//   console.log(vendorId,"vendorId");

//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("messageResponse", (data) => setMessages([...messages, data]));
//   }, [socket, messages]);

//   return (
//     <div className="chat">
//          <ChatBar socket={socket} />
//       <div className="chat__main">
//         <ChatBody messages={messages} />
//         <ChatFooter socket={socket} />
//       </div>
//     </div>
//   );
// }

// export default UserChatPage;
// // Chat.js

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

function UserChatPage() {
//   const location = useLocation();
//   const vendorId = location.state.vendorId;
const {vendorId} = useParams()
  console.log(vendorId, 'vendor');
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.emit("join", { userId: "user123", vendorId });

    newSocket.on("newMessage", (data) => {
      // Handle incoming messages
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { from: data.from, message: data.message },
      ]);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [vendorId]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("sendMessage", { vendorId, message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chatting with Vendor ID: {vendorId}</h2>
      <div>
        {chatMessages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.from}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default UserChatPage;
