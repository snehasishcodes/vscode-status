const mongo = require("mongoose");

module.exports = async () => {
    if (!process.env.MONGODB_URI) return console.log("[DB] No MongoDB connection string was found.");
    await mongo.connect(process.env.MONGODB_URI);
    return mongo;
}

mongo.connection.on('connected', () => {
    console.log("[DB] Database Connected");
});