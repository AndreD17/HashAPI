import express from "express";
import simpleHashSet from "./hashset.js";  

const router = express.Router();
const usernames = new simpleHashSet();

// Register a username
router.post("/register", (req, res) => {  // ✅ Removed extra "."
    const { username } = req.body;
    if (!username){
        return res.status(400).json({ error: "Username is required" });

    } 
    if (usernames.add(username)) {
        res.json({ message: "Username registered successfully" });
    } else {
        res.status(409).json({ error: "Username already exists" });
    }
});

// Check if username already exists
router.get("/exists/:username", (req, res) => {  // ✅ Removed extra space before :username
    const { username } = req.params;
    res.json({ exists: usernames.contains(username) });  // ✅ Fixed reference to usernames.contains(username)
});

// Remove a username
router.delete("/remove/:username", (req, res) => {  // ✅ Removed space before :username
    const { username } = req.params;
    if (usernames.remove(username)) {
        res.json({ message: "Username removed successfully" });
    } else {
        res.status(404).json({ error: "Username not found" });
    }
});

// Get all usernames
router.get("/usernames", (req, res) => {
    res.json({ usernames: usernames.getAllUsernames() });
});

export default router;  // ✅ Use ES Modules
