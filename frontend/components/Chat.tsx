import React from "react";
import "./styles/Chat.scss";

const Chat = ({ socket, connectionInfos }: any) => {
  return (
    <div className="Chat">
      <header>Header</header>
      <main>
        <p className="info">This is the start of the chat</p>
        <ul className="messages_list">
          {Array.from(new Array(50)).map((message: any, index: number) => (
            <li className="message" key={index}>
              <div className="profile_picture_wrapper">
                <img
                  src="https://cdn.dribbble.com/users/1234247/avatars/small/743bfa8e828276ae599742b6f6621992.jpeg?1594037609"
                  alt="profile_picture"
                  className="profile_picture"
                />
              </div>
              <div className="message_content_part">
                <span className="sender_name">Jane</span>
                <span className="sender_message">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, necessitatibus nam! Quae itaque voluptatum nesciunt culpa labore? Minus, odio iure dolor excepturi, numquam ratione corporis nesciunt ex quisquam labore tempore!</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default Chat;
