- Define Routes
```ts
import express from "express";
const router = express.Router();

// GET /api/v1/users
router.get("/", (req, res) => {
    res.json({ message: "List of users" });
});

// POST /api/v1/users
router.post("/", (req, res) => {
    res.json({ message: "User created", data: req.body });
});

export default router;
```

---

- Export Routes
```ts
import express from "express";
import userRoutes from "./users";
import postRoutes from "./posts";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

export default router;
```