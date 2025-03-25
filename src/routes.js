import express from "express";
import rateLimit from "express-rate-limit";
import simpleHashSet from "./hashset.js";  

const router = express.Router();
const usernames = new simpleHashSet(); // ✅ Ensure correct instantiation

// Rate limiter for updating a username
const updateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // Allow only 3 updates per minute per user
    message: { error: "Too many update attempts. Please try again later." }
});

// Define different rate limits for each endpoint
const registerLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Allow only 10 requests per minute for registration
    message: { error: "Too many registration attempts. Please try again later." }
});

const existsLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 10, // Allow 10 checks per minute
    message: { error: "Too many username checks. Please try again later." }
});

const removeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10, // Allow 10 removals per minute
    message: { error: "Too many remove requests. Please try again later." }
});

const getUsernamesLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 15, // Allow 15 requests per minute
    message: { error: "Too many requests for usernames. Please try again later." }
});


// Check if username already exists
router.get("/exists", existsLimiter, (req, res) => {  
    const { username } = req.body;
    res.json({ exists: usernames.contains(username) });  // ✅ Fixed method name
});


// Register a username
router.post("/register", registerLimiter, (req, res) => {  
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    } 
    if (usernames.add(username)) {
        res.json({ message: "Username registered successfully" });
    } else {
        res.status(409).json({ error: "Username already exists" });
    }
});

// Update username
router.put("/update", updateLimiter, (req, res) => {
    const { oldUsername } = req.body;
    const { newUsername } = req.body;

    // Validate request body
    if (!newUsername) {
        return res.status(400).json({ error: "New username is required" });
    }

    // Check if the old username exists
    if (!usernames.contains(oldUsername)) {
        return res.status(404).json({ error: "Username not found" });
    }

    // Check if the new username is already taken
    if (usernames.contains(newUsername)) {
        return res.status(409).json({ error: "New username is already taken" });
    }

    // Update the username
    usernames.remove(oldUsername);
    usernames.add(newUsername);

    res.json({ message: "Username updated successfully", newUsername });
});


// Remove a username
router.delete("/remove", removeLimiter, (req, res) => {  
    const { username } = req.body;
    if (usernames.remove(username)) {  // ✅ Fixed method name
        res.json({ message: "Username removed successfully" });
    } else {
        res.status(404).json({ error: "Username not found" });
    }
});



// Get all usernames
router.get("/usernames", getUsernamesLimiter, (req, res) => {
    res.status(200).json({ usernames: usernames.getAllUsernames() });
});

export default router;  // ✅ Use ES Modules
