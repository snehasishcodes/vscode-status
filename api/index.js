if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const errorHandler = require("./middleware/error");
require("./database/connect")();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("combined"));
app.use(cors());
app.use(errorHandler);
app.set("json spaces", 4);
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", true);
}

// Routes
app.use("/", require("./routes/root"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/update"));

// Status route
app.get("/status", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Status: Online.",
        code: 200
    });
});

// Catch all routes
app.all("*", async (req, res) => {
    res.status(404).json({ success: false, message: "Not found.", code: 404 });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`[SERVER] Started | URL: http://localhost:${PORT} | Server is running on port ${PORT} in ${process.env.NODE_ENV || "developement"} mode.`);
});