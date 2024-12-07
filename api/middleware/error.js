const errorHandler = (error, req, res, next) => {
    console.error(error);
    if (error.expose === true) {
        res.status(error.status || 500).json({ success: false, message: error.message || "Internal Server Error", error: error, code: error.status || 500 });
    } else {
        res.status(500).json({ success: false, message: "Internal Server Error", code: 500 });
    }
};

module.exports = errorHandler;