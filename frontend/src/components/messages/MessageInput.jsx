// import React from 'react'
import { BsSend } from "react-icons/bs";

function MessageInput() {
  return (
    <form className="px-4 my-3">
      <div className="w-full flex bg-gray-700 border-gray-600 rounded-lg text-white ">
        <input
          type="text"
          className=" bg-gray-700 text-sm outline-none  rounded-lg   w-full p-2.5   "
          placeholder="Send a message"
        />
        <button type="submit" className=" flex items-center pe-3">
          <BsSend />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;

