import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    // 1. Extract message content from request body
    const { message } = req.body;

    // 2. Extract receiver's ID from request parameters
    const { id: receiverId } = req.params;

    // 3. Extract sender's ID from the authenticated user attached to the request (via middleware)
    const senderId = req.user._id;

    // 4. Check if a conversation between sender and receiver already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, // Both sender and receiver must be in participants
    });

    // 5. If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId], // Add both participants
      });
    }

    // 6. Create a new message object
    const newMessage = new Message({
      senderId,       // Sender's ID
      receiverId,     // Receiver's ID
      message,        // Message content
    });

    // 7. If the new message was created successfully, push its ID into the conversation's message array
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

   
    // 8. Save both the conversation and message objects in parallel to improve performance
    await Promise.all([conversation.save(), newMessage.save()]);

    // // 9. Emit the new message to the receiver in real-time using Socket.IO
    // const receiverSocketId = getReceiverSocketId(receiverId); // Get receiver's socket ID
    // if (receiverSocketId) {
    //   // Send the new message to the specific receiver via socket
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    // 10. Respond with the newly created message
    res.status(201).json(newMessage);

  } catch (error) {
    // 11. Handle and log errors
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}



export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}