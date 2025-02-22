import express from "express";
import credentialRoutes from "./credentials";
import userRoutes from "./users";

const router = express.Router();

router.use("/", credentialRoutes);
router.use("/users", userRoutes);

export default router;