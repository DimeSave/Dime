import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
import  db from "./config/dbconfig.js";
import apiV1Routes from "./routes/index.js";
import userRoutes from "./routes/users.js";
import specs from "./swagger.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5500;
console.log(process.env)
const allowedOrigins = [
  process.env.FE_BASE_URL,
  process.env.IS_PROD ? "" : `http://localhost:${port}`,
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/v1", apiV1Routes);
app.use("/users", userRoutes);

// Database connection
const connectToDatabase = async () => {
  try {
    await db.authenticate();
    console.log("DATABASE CONNECTED");
    await db.sync({
      // force:true
    });
    console.log("User database created successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

connectToDatabase();

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const stack = req.app.get("env") === "development" ? err.stack : undefined;
  res.status(status).json({ error: { message, stack } });
});

// Start the server
app.listen(port, () => {
  console.log(`Dime Server running on port ${port}`);
  console.log(`API docs available at http://localhost:${port}/api-docs`);
});

export default app;
