import { create } from 'zustand';

// Create a Zustand store named 'useConversation'
const useConversation = create((set) => ({
  // State variable to track the currently selected conversation.
  selectedConversation: null,

  // Function to update the 'selectedConversation' state.
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }), // Updates the selected conversation value in the store.

  // State variable to store messages related to the selected conversation.
  messages: [],

  // Function to update the 'messages' state.
  setMessages: (messages) =>
    set({ messages }), // Updates the messages array in the store.
}));

export default useConversation;
