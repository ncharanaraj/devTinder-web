import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { firstName, lastName } = msg.senderId;
        return {
          userName: `${firstName} ${lastName}`,
          message: msg?.text,
        };
      });

      setMessages(chatMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const mount = async () => {
      await fetchChatMessages();
    };
    mount();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {
          userName: `${firstName} ${lastName}`,
          message: text,
        },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-132px)] py-6">
      <div className="w-4xl bg-base-200 rounded-2xl flex flex-col h-full">
        <div className="p-4 bg-base-300 rounded-t-2xl">
          <h1 className="text-xl font-bold">Chat</h1>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          {messages &&
            messages.map((msg, index) => {
              const { userName, message } = msg;
              return (
                <div
                  key={index}
                  className={`chat ${userName === `${user.firstName} ${user.lastName}` ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-header">
                    {userName}
                    <time className="text-xs opacity-50">12:45</time>
                  </div>
                  <div className="chat-bubble">{message}</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              );
            })}
        </div>
        <div className="p-4 bg-base-300 rounded-b-2xl flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type here"
            className="input flex-1"
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
