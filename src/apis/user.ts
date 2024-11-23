import { Router } from "express";
import { db, auth } from "../config/firebase";
import { validateInput } from "../utils/validation";
import { RegisterUserDTO, UpdateUserDTO } from "./user.dto";

const router = Router();

router.post("/register", async (req, res) => {
    try {
        await validateInput(RegisterUserDTO, req.body);

        const { email, password, name } = req.body;
        const userRecord = await auth.createUser({ email, password });
        await db.collection("users").doc(userRecord.uid).set({ name, email });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
});

router.put("/update", async (req, res) => {
    const uid = res.locals.uid;

    try {
        await validateInput(UpdateUserDTO, req.body);
        await db.collection("users").doc(uid).update(req.body);

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
});

router.delete("/delete", async (req, res) => {
    const uid = res.locals.uid;

    try {
        await auth.deleteUser(uid);
        await db.collection("users").doc(uid).delete();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
});

export default router;
