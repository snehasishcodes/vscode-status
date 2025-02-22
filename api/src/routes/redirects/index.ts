import express from "express";

import landing from "./landing";
import download from "./download";

const router = express.Router();

router.use("/", landing, download);

export default router;