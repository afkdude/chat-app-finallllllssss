import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createGroup, getGroupMessages, getGroupsForSidebar, sendGroupMessage } from "../controllers/group.controller.js";


const router = express.Router();

// Create group
router.post("/create", protectRoute, createGroup);

// Get all groups for sidebar
router.get("/get-grps", protectRoute, getGroupsForSidebar);

// Get messages in a group
router.get("/:id", protectRoute, getGroupMessages);

// Send message to a group
router.post("/:id/send", protectRoute, sendGroupMessage);

export default router;
