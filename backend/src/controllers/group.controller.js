import Group from "../models/group.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// Create a Group
export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    const group = new Group({
      name,
      members,
     
    });

    await group.save();

    res.status(201).json(group);
  } catch (error) {
    console.error("Error in createGroup: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Groups for Sidebar
export const getGroupsForSidebar = async (req, res) => {
  try {

    // Extracting logged-in user's ID
    const userId = req.user._id;

    //filtering groups where the logged-in user is listed as a member 
    const groups = await Group.find({ members: userId }).populate("members", "-password");
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error in getGroupsForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Group Messages
export const getGroupMessages = async (req, res) => {
  try {
    const { id: groupId } = req.params;
    const group = await Group.findById(groupId).populate("messages.senderId", "-password");

    if (!group) return res.status(404).json({ error: "Group not found" });

    res.status(200).json(group.messages);
  } catch (error) {
    console.error("Error in getGroupMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Send Group Message
export const sendGroupMessage = async (req, res) => {
  try {
    const { id: groupId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    const group = await Group.findById(groupId);

    if (!group) return res.status(404).json({ error: "Group not found" });

    const message = {
      senderId,
      text,
      image,
    };

    group.messages.push(message);
    await group.save();

    // Emit message to group members
    group.members.forEach((memberId) => {
      const receiverSocketId = getReceiverSocketId(memberId.toString());
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newGroupMessage", { groupId, message });
      }
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error in sendGroupMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
