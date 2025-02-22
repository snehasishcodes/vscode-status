import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

import base from "./routes/base";
import v1 from "./routes/v1";
import connectMongoDB from "./database/connect";

const app = express();
// connect to mongo db
connectMongoDB();

// Middleware
app.use(morgan("dev")); // Logging
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS
app.set("json spaces", 4);

// Routes - with version
app.use("/api", base);
app.use("/api/v1", v1);

// 404 Handler
app.use((req, res) => {
    // console.log(res);
    res.status(404).json({ message: "Not Found" });
});

export default app;