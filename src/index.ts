import express, { Request, Response } from "express";
import bodyParser from "body-parser";

// Import routes
import userRoutes from "./apis/user";
import notesRoutes from "./apis/notes";

const app = express();

// Middleware
app.use(bodyParser.json());

// Example root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the User Management Backend!");
});

// Use routes for APIs
app.use("/api/users", userRoutes); // User routes will be available at /api/users
app.use("/api/notes", notesRoutes); // Notes routes will be available at /api/notes

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
