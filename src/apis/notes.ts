import { Router } from "express";
import { db } from "../config/firebase";

const router = Router();

// Save Notes API
router.post("/save", async (req, res) => {
    const uid = res.locals.uid;

    try {
        const { title, content } = req.body;
        const note = { title, content, timestamp: new Date(), userId: uid };

        await db.collection("notes").add(note);
        res.status(201).json({ message: "Note saved successfully" });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
});

// Get Notes API
router.get("/", async (req, res) => {
    const uid = res.locals.uid;

    try {
        const notesSnapshot = await db.collection("notes").where("userId", "==", uid).get();
        const notes = notesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
});

export default router;
