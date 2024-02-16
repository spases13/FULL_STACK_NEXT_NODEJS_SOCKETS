import React, { useEffect, useState } from "react";
import "./styles/Chat.scss";

const Chat = ({ socket, connectionInfos }: any) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messagesList, setMessagesList] = useState<any>([]);

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        socketId : socket.id,
        room: connectionInfos.room,
        name: connectionInfos.name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessagesList((list: any) => [...list, messageData]);

    }

    
  };
  useEffect(() => {
    const handleReceiveMessage = (newMessage: any) => {
      setMessagesList((list: any) => [...list, newMessage]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, messagesList]);

  return (
    <>
      {/* <h3 style={{ marginTop: "3rem" }}>MESSAGE IS : {currentMessage}</h3> */}
      <div className="Chat">
        <header>
          <span>Room#{connectionInfos.room} ({connectionInfos.name})</span>
        </header>
        <main>
          <p className="info">This is the start of the chat</p>
          <ul className="messages_list">
            {messagesList.map((messageData: any, index: number) => (
              <li className="message" key={index}>
                <div className="profile_picture_wrapper">
                  {/* <img
                    src="https://cdn.dribbble.com/users/1234247/avatars/small/743bfa8e828276ae599742b6f6621992.jpeg?1594037609"
                    alt="profile_picture"
                    className="profile_picture"
                  /> */}
                </div>
                <div className="message_content_part">
                  <span className={`sender_name ${messageData.name !== connectionInfos.name ? "sender_other" : ""}`}>{messageData.name}</span>
                  <span className="sender_message">{messageData.message}</span>
                  <span className="sender_time">{messageData.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </main>
        <footer>
          <form>
            <div className="input_wrapper">
              <div className="emoji_menu">
                <i className="icon bx bx-smile"></i>
              </div>
              <input
                type="text"
                placeholder="Type here..."
                className="input_message"
                name="input_message"
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
            </div>
            <button type="reset" className="btn_send_message" onClick={() => sendMessage()}>
              <i className="icon bx bx-send"></i>
            </button>
          </form>
        </footer>
      </div>
    </>
  );
};

export default Chat;
