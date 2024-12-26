/* eslint-disable react/prop-types */

import useConversation from "../../zustand/useConversation";

function Conversation({ conversation, lastIdx, emoji }) {
  // Get Zustand state for the selected conversation
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Check if this conversation is the currently selected one
  const isSelected = selectedConversation?._id === conversation._id;

  return (
    <>
      {/* Render the conversation item */}
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""} // Highlight if selected
        `}
        // Handle click to set this conversation as selected
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* Display the user's avatar */}
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        {/* Display conversation details */}
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            {/* Show the full name of the user */}
            <p className="font-bold text-gray-200">{conversation.fullname}</p>
            {/* Display a random emoji */}
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {/* Render a divider between conversations unless this is the last one */}
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}

// Export the component for reuse
export default Conversation;
