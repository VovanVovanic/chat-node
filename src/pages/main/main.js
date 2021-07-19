
import classes from './main.module.scss';
import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/message";
import ChatOnline from "../../components/chat/chat";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { io } from "socket.io-client";


export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();



  useEffect(() => {
    const getConversations = async () => {
      try {
      const res = await axios.get("/conversations/" + user._id)
      setConversations(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    getConversations()
  }, [])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

   const handleSubmit = async (e) => {
     e.preventDefault();
     const message = {
       sender: user._id,
       text: newMessage,
       conversationId: currentChat._id,
     };

    //  const receiverId = currentChat.members.find(
    //    (member) => member !== user._id
    //  );

    //  socket.current.emit("sendMessage", {
    //    senderId: user._id,
    //    receiverId,
    //    text: newMessage,
    //  });

     try {
       const res = await axios.post("/messages", message);
       setMessages([...messages, res.data]);
       setNewMessage("");
     } catch (err) {
       console.log(err);
     }
  };
  
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  return (
    <>
      <div className={classes.messenger}>
        <div className={classes.chatMenu}>
          <div className={classes.chatMenuWrapper}>
            <input
              placeholder="Search for friends"
              className={classes.chatMenuInput}
            />
            {conversations.map((theme) => (
              <div key={theme._id} onClick={() => setCurrentChat(theme)}>
                <Conversation conversation={theme} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={classes.chatBoxTop}>
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m.createdAt}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className={classes.chatBoxBottom}>
                  <textarea
                    className={classes.chatMessageInput}
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className={classes.chatSubmitButton}
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className={classes.noConversationText}>
                Press the button to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className={classes.chatOnline}>
          <div className={classes.chatOnlineWrapper}>
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}