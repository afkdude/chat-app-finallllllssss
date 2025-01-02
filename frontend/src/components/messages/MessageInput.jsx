// import React from 'react'
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput() {

  const [message, setMessage] = useState(""); 

  //calling hook to give value

  const {  sendMessage } = useSendMessage(); 
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!message) {
      return; 
    }

    await sendMessage(message); 
    setMessage("");
  }
  return (
    <form className="px-4 my-3"  onSubmit={handleSubmit}>
      <div className="w-full flex bg-gray-700 border-gray-600 rounded-lg text-white ">
        <input
          type="text"
          className=" bg-gray-700 text-sm outline-none  rounded-lg   w-full p-2.5   "
          placeholder="Send a message"
          value={message}
          onChange={ (e) =>setMessage(e.target.value) }
        />
        <button type="submit" className=" flex items-center pe-3">
          <BsSend />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;

