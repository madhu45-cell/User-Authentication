import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectdb from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Create Express app
const app = express();

// Port where the app will run
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectdb();

// Allow requests from this origin
const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());

// ✅ Correct CORS setup
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Default route
app.get('/', (req, res) => {
  res.send("Server is running");
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
