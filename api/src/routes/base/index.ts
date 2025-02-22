import express from "express";
import userRoutes from "./users";

const router = express.Router();

router.use("/", userRoutes);

export default router;